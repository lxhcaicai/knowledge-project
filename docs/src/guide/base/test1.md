---
outline: deep
---


# 开始
重点讲一下 equals()和 hashcode()方法，然后看一下 String 类常用方法的实现

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {

    /** 保存String的字节数组 */
    private final char value[];

    /** 缓存这个String的hash值 */
    private int hash; // Default to 0

    /** use serialVersionUID from JDK 1.0.2 for interoperability */
    private static final long serialVersionUID = -6849794470754667710L;

    /**
     * 1、Object的 hashCode()返回该对象的内存地址编号，而equals()比较的是内存地址是否相等；
     * 2、需要注意的是当equals()方法被重写时，hashCode()也要被重写；
     * 3、按照一般hashCode()方法的实现来说，equals()相等的两个对象，hashcode()必须保持相等；
     *    equals()不相等的两个对象，hashcode()未必不相等
     * 4、一个类如果要作为 HashMap 的 key，必须重写equals()和hashCode()方法
     */
    public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }

    public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            char val[] = value;

            for (int i = 0; i < value.length; i++) {
                h = 31 * h + val[i];
            }
            hash = h;
        }
        return h;
    }

    /**
     * 指定下标的char
     */
    public char charAt(int index) {
        if ((index < 0) || (index >= value.length)) {
            throw new StringIndexOutOfBoundsException(index);
        }
        return value[index];
    }

    /**
     * 是否以 prefix 为前缀
     */
    public boolean startsWith(String prefix) {
        return startsWith(prefix, 0);
    }

    /**
     * 是否以 suffix 为后缀
     */
    public boolean endsWith(String suffix) {
        return startsWith(suffix, value.length - suffix.value.length);
    }

    /**
     * 该String对象 是否满足 regex正则表达式
     */
    public boolean matches(String regex) {
        return Pattern.matches(regex, this);
    }

    /**
     * 字符替换
     */
    public String replace(char oldChar, char newChar) {
        if (oldChar != newChar) {
            int len = value.length;
            int i = -1;
            char[] val = value; /* avoid getfield opcode */

            while (++i < len) {
                if (val[i] == oldChar) {
                    break;
                }
            }
            if (i < len) {
                char buf[] = new char[len];
                for (int j = 0; j < i; j++) {
                    buf[j] = val[j];
                }
                while (i < len) {
                    char c = val[i];
                    buf[i] = (c == oldChar) ? newChar : c;
                    i++;
                }
                return new String(buf, true);
            }
        }
        return this;
    }

    /**
     * 子串替换
     */
    public String replaceAll(String regex, String replacement) {
        return Pattern.compile(regex).matcher(this).replaceAll(replacement);
    }

    /**
     * 子串替换，只替换第一个
     */
    public String replaceFirst(String regex, String replacement) {
        return Pattern.compile(regex).matcher(this).replaceFirst(replacement);
    }

    /**
     * 按 regex 切割成多个子串
     */
    public String[] split(String regex) {
        return split(regex, 0);
    }

    /**
     * 剪切指定范围的字符串
     */
    public String substring(int beginIndex) {
        if (beginIndex < 0) {
            throw new StringIndexOutOfBoundsException(beginIndex);
        }
        int subLen = value.length - beginIndex;
        if (subLen < 0) {
            throw new StringIndexOutOfBoundsException(subLen);
        }
        return (beginIndex == 0) ? this : new String(value, beginIndex, subLen);
    }

    public String substring(int beginIndex, int endIndex) {
        if (beginIndex < 0) {
            throw new StringIndexOutOfBoundsException(beginIndex);
        }
        if (endIndex > value.length) {
            throw new StringIndexOutOfBoundsException(endIndex);
        }
        int subLen = endIndex - beginIndex;
        if (subLen < 0) {
            throw new StringIndexOutOfBoundsException(subLen);
        }
        return ((beginIndex == 0) && (endIndex == value.length)) ? this
                : new String(value, beginIndex, subLen);
    }

    /**
     * 获取该String 对应的 char[]
     */
    public char[] toCharArray() {
        // Cannot use Arrays.copyOf because of class initialization order issues
        char result[] = new char[value.length];
        System.arraycopy(value, 0, result, 0, value.length);
        return result;
    }

    /**
     * 大小写转换
     */
    public String toLowerCase() {
        return toLowerCase(Locale.getDefault());
    }
    public String toUpperCase() {
        return toUpperCase(Locale.getDefault());
    }

    /**
     * str在本String对象中第一次出现的下标
     */
    public int indexOf(String str) {
        return indexOf(str, 0);
    }

    /**
     * str在本String对象中最后一次出现的下标
     */
    public int lastIndexOf(String str) {
        return lastIndexOf(str, value.length);
    }
}
```



### 1. String类的概述

+ **不可变性:** String对象一旦创建，其值就不能被修改。这是为了保证字符串的安全性、一致性和高效性。
+ **常量池:** 字符串常量会被放入常量池中，相同的字符串常量在内存中只保存一份。
+ **实现接口:** Serializable、Comparable、CharSequence
+ **存储结构:** JDK9之前使用char数组存储字符，JDK9之后引入压缩机制，使用byte数组存储。

### 2. 核心属性

+ **value:** 存储字符串的字符数组。
+ **coder:** 编码方式，LATIN1或UTF16。

### 3. 构造方法

+ **String(String original):** 通过另一个字符串创建新的字符串对象。
+ **String(char[] value):** 通过字符数组创建字符串对象。
+ **String(byte[] bytes):** 通过字节数组创建字符串对象。

### 4. 重要方法

+ **length():** 返回字符串长度。
+ **charAt(int index):** 返回指定索引处的字符。
+ **substring(int beginIndex, int endIndex):** 返回指定范围内的子字符串。
+ **equals(Object anObject):** 判断两个字符串是否相等。
+ **compareTo(String anotherString):** 比较两个字符串的大小。
+ **indexOf(String str):** 返回指定子字符串在字符串中第一次出现的索引。
+ **concat(String str):** 连接两个字符串。
+ **toLowerCase():** 将字符串转换为小写。
+ **toUpperCase():** 将字符串转换为大写。
+ **replace(char oldChar, char newChar):** 替换字符串中的指定字符。
+ **split(String regex):** 根据正则表达式分割字符串。
+ **intern():** 将字符串放入字符串常量池中。

### 5. 关键点

+ **字符串常量池:** 了解字符串常量池的工作原理，有助于理解字符串的内存模型和优化。
+ **不可变性的好处:** 不可变性使得字符串可以安全地共享，避免了并发修改的问题。
+ **编码方式:** 了解不同的编码方式，有助于处理不同字符集的字符串。
+ **压缩机制:** JDK9引入的压缩机制，提高了字符串的存储效率。
+ **常见问题:**
    - `==`和`equals()`的区别
    - 字符串拼接的性能问题
    - `StringBuilder`和`StringBuffer`的使用场景

