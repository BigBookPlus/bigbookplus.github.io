---
title: "OpenCV 4.X 使用CvxText在图片显示汉字"
subtitle: ''
author: "BigBook"
header-style: text
tag:
  - CvxText
  - OpenCV 4.5
  - C/C++
---

最近又需要在图像上实时绘制汉字。一般来讲如果绘制汉字的需求绕不过的话，直接绘制在图片总归是最easy的实现方式。因为不然的话可能要额外调用GUI组件来实现。一般都是用freetype+cvxtext，老生常谈。且不说实际实现起来是否最easy，主要是这种方法多年来实践了无数次了，不过今次切换到OpenCV4.5，突然发现可能又要修改CvxText代码才可以，因为直接使用，不work。

## 准备

需要的依赖有：
- C/C++ 编译环境（似乎是废话）
- OpenCV (仍然废话)
- freetype的lib： 提前编译好，官网是 https://freetype.org/，我使用的版本是2.9.1
- 字体文件，一般用`simhei.ttf`。在操作系统的字体里面哦。

## 修改 CvxText 代码

我这里有一份CvxText代码，在旧版本的OpenCV下可以使用（OpenCV3.X)。如今更换到了OpenCV4.5，这份代码直接使用会有些小问题，不过都很容易修改。

### OpenCV头文件包含方式
首先需要重写头文件包含方法。在OpenCV4以前，include下有两个子目录，分别是opencv，和opencv2。在OpenCV4.X后，include下只剩一个opencv2文件夹了。涉及到opencv的头文件包含代码，改为如下形式：

```cpp
#include "opencv2/core/core.hpp"
#include "opencv2/core/core_c.h"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
```

这里特别说明，引入`core_c.h`这个头文件很重要。因为我手里这份CvxText代码类型都是基于旧式的C类型，`core_c.h` 提供了对C类型的兼容。


### CvScalar类型问题
下一处需要修改的是和CvScalar相关的代码。尽管我们重新写了头文件包含，引入了C类型，但是有些代码仍然不能直接编译通过， 因为CvScalar不能隐式的转为C++类型的cv::Scalar。下面的`puttext`函数代码中，我修改了显式的手工转换替代了注释中的代码。样子很丑，但是简单好用（总共花费了不到1分钟）。

```cpp

int CvxText::putText(cv::Mat &frame, const char    *text, CvPoint pos)
{
	//return putText(frame, text, pos, CV_RGB(255, 255, 255));
	CvScalar s = {255, 255, 255};
	return putText(frame, text, pos, s);
}
int CvxText::putText(cv::Mat &frame, const wchar_t *text, CvPoint pos)
{
	//return putText(frame, text, pos, CV_RGB(255, 255, 255));
	CvScalar s = {255, 255, 255};
	return putText(frame, text, pos, s);
}
```

### cv::Mat转为IplImage

另一处就是比较老生常谈的问题，cv::Mat转为IplImage。这里之前的实现是直接采用C形式的强制转换，如下所示：
```cpp
void CvxText::putWChar(cv::Mat &frame, wchar_t wc, CvPoint &pos, CvScalar color)
{
	IplImage* img = NULL;
	img = &(IplImage)frame;

    ...

}
```

很不幸，现在这样做在似乎不work了。好在cv::Mat转IplImage仍然有提供接口可用。打开core_c.h文件，可以看到一个很显眼的函数声明，

```cpp
CV_EXPORTS _IplImage cvIplImage(const cv::Mat& m);
```

所以调用该接口，传入cv::Mat对象会返回转换好的IplImage类型的对象。直接修改代码如下

```cpp
	IplImage* img = NULL;
	img = &(cvIplImage(frame));
```

至此，代码就可以正常工作了。


## 调用方法

初始化
```cpp
    CvxText text;
```

调用接口
```cpp
int putText(cv::Mat &frame, const char    *text, CvPoint pos);
```

## CvxText代码
把我改后的代码分享一下。在OpenCV 4.5下亲测可用。理论上4.X的OpenCV应该都可使用。

### 头文件 CvxText.h

```cpp
#ifndef CVX_TEXT_H
#define CVX_TEXT_H

#include <ft2build.h>  
#include FT_FREETYPE_H  
#include "opencv2/core/core.hpp"
#include "opencv2/core/core_c.h"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
class CvxText
{
	// ��ֹcopy  
	CvxText& operator=(const CvxText&);
public:
	CvxText(const char *freeType);
	virtual ~CvxText();

	/**
	* ��ȡ���塣Ŀǰ��Щ�����в�֧�֡�
	*
	* \param font        ��������, Ŀǰ��֧��
	* \param size        �����С/�հױ���/�������/��ת�Ƕ�
	* \param underline   �»���
	* \param diaphaneity ͸����
	*
	* \sa setFont, restoreFont
	*/

	void getFont(int *type,
		CvScalar *size = NULL, bool *underline = NULL, float *diaphaneity = NULL);

	/**
	* �������塣Ŀǰ��Щ�����в�֧�֡�
	*
	* \param font        ��������, Ŀǰ��֧��
	* \param size        �����С/�հױ���/�������/��ת�Ƕ�
	* \param underline   �»���
	* \param diaphaneity ͸����
	*
	* \sa getFont, restoreFont
	*/

	void setFont(int *type,
		CvScalar *size = NULL, bool *underline = NULL, float *diaphaneity = NULL);

	/**
	* �ָ�ԭʼ���������á�
	*
	* \sa getFont, setFont
	*/

	void restoreFont();

	//================================================================  
	//================================================================  

	/**
	* �������(��ɫĬ��Ϊ��ɫ)����������������ַ���ֹͣ��
	*
	* \param img  �����Ӱ��
	* \param text �ı�����
	* \param pos  �ı�λ��
	*
	* \return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/

	int putText(cv::Mat &frame, const char    *text, CvPoint pos);

	/**
	* �������(��ɫĬ��Ϊ��ɫ)����������������ַ���ֹͣ��
	*
	* \param img  �����Ӱ��
	* \param text �ı�����
	* \param pos  �ı�λ��
	*
	* \return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/

	int putText(cv::Mat &frame, const wchar_t *text, CvPoint pos);

	/**
	* ������֡���������������ַ���ֹͣ��
	*
	* \param img   �����Ӱ��
	* \param text  �ı�����
	* \param pos   �ı�λ��
	* \param color �ı���ɫ
	*
	* \return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/

	int putText(cv::Mat &frame, const char    *text, CvPoint pos, CvScalar color);

	/**
	* ������֡���������������ַ���ֹͣ��
	*
	* \param img   �����Ӱ��
	* \param text  �ı�����
	* \param pos   �ı�λ��
	* \param color �ı���ɫ
	*
	* \return ���سɹ�������ַ����ȣ�ʧ�ܷ���-1��
	*/
	int putText(cv::Mat &frame, const wchar_t *text, CvPoint pos, CvScalar color);

	//================================================================  
	//================================================================  

private:

	// �����ǰ�ַ�, ����m_posλ��  

	void putWChar(cv::Mat &frame, wchar_t wc, CvPoint &pos, CvScalar color);

	//================================================================  
	//================================================================  

private:

	FT_Library   m_library;   // �ֿ�  
	FT_Face      m_face;      // ����  

	//================================================================  
	//================================================================  

	// Ĭ�ϵ������������  

	int         m_fontType;
	CvScalar   m_fontSize;
	bool      m_fontUnderline;
	float      m_fontDiaphaneity;
};

#endif

```

### 实现文件 CvxText.cpp


```cpp

#include "CvxText.h"
#include <wchar.h>  
#include <assert.h>  
#include <locale.h>  
#include <ctype.h> 
#include "opencv2/core/core.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"

using namespace cv;
// ���ֿ�  

CvxText::CvxText(const char *freeType)
{
	assert(freeType != NULL);

	// ���ֿ��ļ�, ����һ������  

	if (FT_Init_FreeType(&m_library)) throw;
	int result = 100;
	//result = FT_New_Face(m_library, freeType, 0, &m_face);
	if (result = FT_New_Face(m_library, freeType, 0, &m_face)) throw;
	

	// ���������������  

	restoreFont();

	// ����C���Ե��ַ�������  

	setlocale(LC_ALL, "");
}

// �ͷ�FreeType��Դ  

CvxText::~CvxText()
{
	FT_Done_Face(m_face);
	FT_Done_FreeType(m_library);
}

// �����������:  
//  
// font         - ��������, Ŀǰ��֧��  
// size         - �����С/�հױ���/�������/��ת�Ƕ�  
// underline   - �»���  
// diaphaneity   - ͸����  

void CvxText::getFont(int *type, CvScalar *size, bool *underline, float *diaphaneity)
{
	if (type) *type = m_fontType;
	if (size) *size = m_fontSize;
	if (underline) *underline = m_fontUnderline;
	if (diaphaneity) *diaphaneity = m_fontDiaphaneity;
}

void CvxText::setFont(int *type, CvScalar *size, bool *underline, float *diaphaneity)
{
	// �����Ϸ��Լ��  

	if (type)
	{
		if (type >= 0) m_fontType = *type;
	}
	if (size)
	{
		m_fontSize.val[0] = fabs(size->val[0]);
		m_fontSize.val[1] = fabs(size->val[1]);
		m_fontSize.val[2] = fabs(size->val[2]);
		m_fontSize.val[3] = fabs(size->val[3]);
	}
	if (underline)
	{
		m_fontUnderline = *underline;
	}
	if (diaphaneity)
	{
		m_fontDiaphaneity = *diaphaneity;
	}
}

// �ָ�ԭʼ����������  

void CvxText::restoreFont()
{
	m_fontType = 0;            // ��������(��֧��)  

	m_fontSize.val[0] = 40;      // �����С  
	m_fontSize.val[1] = 0.5;   // �հ��ַ���С����  
	m_fontSize.val[2] = 0.1;   // �����С����  
	m_fontSize.val[3] = 0;      // ��ת�Ƕ�(��֧��)  

	m_fontUnderline = false;   // �»���(��֧��)  

	m_fontDiaphaneity = 1.0;   // ɫ�ʱ���(�ɲ���͸��Ч��)  

	// �����ַ���С  

	FT_Set_Pixel_Sizes(m_face, (int)m_fontSize.val[0], 0);
}

// �������(��ɫĬ��Ϊ��ɫ)  

int CvxText::putText(cv::Mat &frame, const char    *text, CvPoint pos)
{
	//return putText(frame, text, pos, CV_RGB(255, 255, 255));
	CvScalar s = {255, 255, 255};
	return putText(frame, text, pos, s);
}
int CvxText::putText(cv::Mat &frame, const wchar_t *text, CvPoint pos)
{
	//return putText(frame, text, pos, CV_RGB(255, 255, 255));
	CvScalar s = {255, 255, 255};
	return putText(frame, text, pos, s);
}

//  

int CvxText::putText(cv::Mat &frame, const char    *text, CvPoint pos, CvScalar color)
{
	if (frame.empty()) return -1;
	if (text == NULL) return -1;

	//  

	int i;
	for (i = 0; text[i] != '\0'; ++i)
	{
		wchar_t wc = text[i];

		// ����˫�ֽڷ���  

		if (!isascii(wc)) mbtowc(&wc, &text[i++], 2);

		// �����ǰ���ַ�  

		putWChar(frame, wc, pos, color);
	}
	return i;
}
int CvxText::putText(cv::Mat &frame, const wchar_t *text, CvPoint pos, CvScalar color)
{
	if (frame.empty()) return -1;
	if (text == NULL) return -1;

	//  

	int i;
	for (i = 0; text[i] != '\0'; ++i)
	{
		// �����ǰ���ַ�  

		putWChar(frame, text[i], pos, color);
	}
	return i;
}

// �����ǰ�ַ�, ����m_posλ��  

void CvxText::putWChar(cv::Mat &frame, wchar_t wc, CvPoint &pos, CvScalar color)
{
	IplImage* img = NULL;
	img = &(cvIplImage(frame));

	// ����unicode��������Ķ�ֵλͼ  

	FT_UInt glyph_index = FT_Get_Char_Index(m_face, wc);
	FT_Load_Glyph(m_face, glyph_index, FT_LOAD_DEFAULT);
	FT_Render_Glyph(m_face->glyph, FT_RENDER_MODE_MONO);

	//  

	FT_GlyphSlot slot = m_face->glyph;

	// ������  

	int rows = slot->bitmap.rows;
	int cols = slot->bitmap.width;

	//  

	for (int i = 0; i < rows; ++i)
	{
		for (int j = 0; j < cols; ++j)
		{
			int off = ((img->origin == 0) ? i : (rows - 1 - i))
				* slot->bitmap.pitch + j / 8;

			if (slot->bitmap.buffer[off] & (0xC0 >> (j % 8)))
			{
				int r = (img->origin == 0) ? pos.y - (rows - 1 - i) : pos.y + i;;
				int c = pos.x + j;

				if (r >= 0 && r < img->height
					&& c >= 0 && c < img->width)
				{
					CvScalar scalar = cvGet2D(img, r, c);

					// ����ɫ���ں�  

					float p = m_fontDiaphaneity;
					for (int k = 0; k < 4; ++k)
					{
						scalar.val[k] = scalar.val[k] * (1 - p) + color.val[k] * p;
					}

					cvSet2D(img, r, c, scalar);
				}
			}
		} // end for  
	} // end for  

	// �޸���һ���ֵ����λ��  

	double space = m_fontSize.val[0] * m_fontSize.val[1];
	double sep = m_fontSize.val[0] * m_fontSize.val[2];

	pos.x += (int)((cols ? cols : space) + sep);
}

```