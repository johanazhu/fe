# Mysql数据类型明细表

这里我们通过 LLM 来梳理出 Mysql 的数据类型，通过分类+表格的形式让我们更清晰了解原委



## 数值类型

### 1.1 整数类型

| 类型        | 存储空间 | 取值范围（有符号）              | 取值范围（无符号） |
| ----------- | -------- | ------------------------------- | ------------------ |
| `TINYINT`   | 1 字节   | -128 到 127                     | 0 到 255           |
| `SMALLINT`  | 2 字节   | -32,768 到 32,767               | 0 到 65,535        |
| `MEDIUMINT` | 3 字节   | -8,388,608 到 8,388,607         | 0 到 16,777,215    |
| `INT`       | 4 字节   | -2,147,483,648 到 2,147,483,647 | 0 到 4,294,967,295 |
| `BIGINT`    | 8 字节   | -2^63 到 2^63-1                 | 0 到 2^64-1        |

### 1.2 浮点数类型

| 类型     | 存储空间 | 说明                           |
| -------- | -------- | ------------------------------ |
| `FLOAT`  | 4 字节   | 单精度浮点数，精度约 7 位小数  |
| `DOUBLE` | 8 字节   | 双精度浮点数，精度约 15 位小数 |

### 1.3 定点数类型

| 类型           | 存储空间 | 说明                             |
| -------------- | -------- | -------------------------------- |
| `DECIMAL(M,D)` | 可变     | 定点数，M 为总位数，D 为小数位数 |

------

## 2. **日期和时间类型**

| 类型        | 存储空间 | 格式                  | 说明                                   |
| ----------- | -------- | --------------------- | -------------------------------------- |
| `DATE`      | 3 字节   | `YYYY-MM-DD`          | 仅存储日期                             |
| `TIME`      | 3 字节   | `HH:MM:SS`            | 仅存储时间                             |
| `DATETIME`  | 8 字节   | `YYYY-MM-DD HH:MM:SS` | 存储日期和时间                         |
| `TIMESTAMP` | 4 字节   | `YYYY-MM-DD HH:MM:SS` | 存储日期和时间，范围较小，支持时区转换 |
| `YEAR`      | 1 字节   | `YYYY`                | 仅存储年份                             |

------

## 3. **字符串类型**

### 3.1 定长字符串

| 类型      | 存储空间 | 说明                   |
| --------- | -------- | ---------------------- |
| `CHAR(M)` | M 字节   | 定长字符串，M 为字符数 |

### 3.2 变长字符串

| 类型         | 存储空间 | 说明                       |
| ------------ | -------- | -------------------------- |
| `VARCHAR(M)` | 可变     | 变长字符串，M 为最大字符数 |

### 3.3 文本类型

| 类型         | 存储空间                | 说明         |
| ------------ | ----------------------- | ------------ |
| `TINYTEXT`   | 最大 255 字节           | 短文本       |
| `TEXT`       | 最大 65,535 字节        | 长文本       |
| `MEDIUMTEXT` | 最大 16,777,215 字节    | 中等长度文本 |
| `LONGTEXT`   | 最大 4,294,967,295 字节 | 超长文本     |

------

## 4. **二进制类型**

### 4.1 定长二进制

| 类型        | 存储空间 | 说明           |
| ----------- | -------- | -------------- |
| `BINARY(M)` | M 字节   | 定长二进制数据 |

### 4.2 变长二进制

| 类型           | 存储空间 | 说明           |
| -------------- | -------- | -------------- |
| `VARBINARY(M)` | 可变     | 变长二进制数据 |

### 4.3 二进制大对象（BLOB）

| 类型         | 存储空间                | 说明               |
| ------------ | ----------------------- | ------------------ |
| `TINYBLOB`   | 最大 255 字节           | 短二进制数据       |
| `BLOB`       | 最大 65,535 字节        | 二进制大对象       |
| `MEDIUMBLOB` | 最大 16,777,215 字节    | 中等长度二进制数据 |
| `LONGBLOB`   | 最大 4,294,967,295 字节 | 超长二进制数据     |

------

## 5. **JSON 类型**

| 类型   | 存储空间 | 说明                 |
| ------ | -------- | -------------------- |
| `JSON` | 可变     | 存储 JSON 格式的数据 |

------

## 6. **枚举和集合类型**

### 6.1 枚举类型

| 类型                            | 存储空间    | 说明                       |
| ------------------------------- | ----------- | -------------------------- |
| `ENUM('value1', 'value2', ...)` | 1 或 2 字节 | 枚举类型，只能存储指定的值 |

### 6.2 集合类型

| 类型                           | 存储空间    | 说明                           |
| ------------------------------ | ----------- | ------------------------------ |
| `SET('value1', 'value2', ...)` | 1 到 8 字节 | 集合类型，可以存储多个指定的值 |

------

## 7. **空间数据类型**

| 类型                 | 说明                   |
| -------------------- | ---------------------- |
| `GEOMETRY`           | 存储任意类型的几何数据 |
| `POINT`              | 存储一个点             |
| `LINESTRING`         | 存储一条线             |
| `POLYGON`            | 存储一个多边形         |
| `MULTIPOINT`         | 存储多个点             |
| `MULTILINESTRING`    | 存储多条线             |
| `MULTIPOLYGON`       | 存储多个多边形         |
| `GEOMETRYCOLLECTION` | 存储多个几何对象       |

------

## 8. **其他类型**

| 类型      | 说明                            |
| --------- | ------------------------------- |
| `BOOLEAN` | `TINYINT(1)` 的别名，存储布尔值 |
| `BIT(M)`  | 存储位字段，M 为位数            |

