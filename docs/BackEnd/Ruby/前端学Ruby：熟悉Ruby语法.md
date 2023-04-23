# 前端学 Ruby：熟悉 Ruby 语法



## 写在前面

> 我们当然希望能在本地中执行代码，如果你还没有只是看看，还没安装 ruby，可以在 [try ruby](https://try.ruby-lang.org/) 或者 [replit](https://replit.com/languages/ruby) 在线编写代码



## 本文目录

Ruby 是什么

基本语法

- 变量
- 算术操作
- 位运算符
- 打印输出
- 注释

条件语句：控制流

循环/迭代器

数据结构

- String
- Integer/Float
- Array
- Hash
- Set
- Range

函数（方法）

面向对象编程

- 对象
- 类





## Ruby 是什么

### 弱类型语言

Ruby 是一门弱类型语言，和 JavaScript 一样

```ruby
a = 5;
a = 'Hello'
puts a # Hello
```

### 命名风格

像变量（variable）、符号（symbol）、方法（method），通常使用 snake_case 风格

> snake_case 风格即短语内的各个单词之间以下划线做间隔

像常数（constant），使用 CONST_FOO 风格

类名（class name），使用骆驼 （CamelCase）风格

文件名（file name），使用 snake_case 风格

“$”开头的变量：全局变量

“@”开头的变量：实例变量

“@@”开头的变量：类变量

小写字母或者下划线（_）开头的变量：局部变量



## 基本语法

Ruby 的赋值不需要加任何关键字，直接一个 `变量名=值` 即可 

### 变量

```ruby
x = 25 # => 25
x # => 25
```

> 注意赋值语句返回了赋的值，这意味着你可以用多重赋值语句

```ruby
x = y = 10 # => 10
x # => 10
y # => 10

# 除了整数，我们还可以使用booleans、string、symbol、float 等数据类型
# booleans
true_boolean = true
false_boolean = false

# string 
my_name = 'johnny'

# symbol
a_symbol = :my_symbol

# float 
book_price = 15.80
```

### 算术操作

```ruby
1 + 1 # =>2
7 - 1 # => 6
10 * 9 # => 90
42 / 7 # => 6
2 ** 5 # => 32 2的5次方
5 % 3 # => 2
```

### 位运算符

```ruby
3 & 5 # => 1
3 | 5 # => 7
3 ^ 5 # => 6
```

### 打印输出

```ruby
puts "I'm printing!" # 打印输出，并在末尾加换行符
#=> I'm printing!
#=> nil

print "I'm printing!" # 打印输出，不加换行符
#=> I'm printing! => nil

# ⭐除此之外，还可以用缩写 p
p "I'm printing!"
```

### 注释

```ruby
# 单行注释
=begin
	多行注释
=end
```



## 条件语句：控制流

通过 `if...else...` 做条件判断。如果为真，它会执行语句中的内容。例如：

```ruby
if true
    puts "Hello Ruby If"
end

if 2 > 1
    puts "2 大于 1"
end
```

与 JavaScript 相比，它没有更多的括号，只写必要的东西，但是因为没有中括号，所以当要结束时，需要用 `end` 来做分离

> 后续的 def（函数标识符）、class（类标识符）都会有 end 来做结束

除此之外，还有 `if...else...`：

```ruby
if 2 > 1
	puts "2 大于 1"
else
    puts "2 小于 1"
end
```

还有 `elsif` 语法，注意不是 `elseif`，而是`elsif`，它，缩写了

```ruby
if 2 > 1
	puts "2 大于 1"
elsif 2 < 1
    puts "2 小于 1"
else
    puts "2 等于 1"
end
```

我们还可以用「倒装句」来写 if 语句

```ruby
def hey_ho?
    true
end

puts "let's go" if hey_ho?
```



## 循环/迭代器

在 Ruby 中，我们可以以多种不同的方式进行迭代。这里我们讨论三个迭代器：while、for 和 each

### while 循环

只要语句为真，代码块中的代码就会被执行，如打印 1 到 10 的数字：

```ruby
num = 1

while num <= 10
    puts num
    num += 1
end
```

看看，Ruby 的代码整洁的好看

### For 循环

将变量 num 传递给块，for 语句将迭代它：

```ruby
for num in 1...10
    puts num
end
```

### Each 迭代器

与其他两种不同，这种写法更像调用方法

```ruby
[1, 2, 3, 4, 5].each do |num|
    puts num
end
```

其中 each 迭代器和 for 循环有什么不同呢？ each 迭代器只维护迭代块内的变量，而 for 循环允许变量存在于块外

```ruby
# for vs each

# for looping
for num in 1...5
    puts num
end

puts num # => 5

# each iterator
[1, 2, 3, 4, 5].each do |num|
    puts num
end

put num # => undefined local variable or method `num' for main:Object (NameError)
```

这里就牵扯到 block（块）了，在用 each 的时候也用到了 do 关键字，它会定义块，块会形成作用域，作用域内部的变量，外部不能方面（这里可以联想到 ES6 中的块级作用域）



## 数据类型

Ruby 的数据类型有很多，很细分，有String、Number、Float、Array、Hash、Set、Range、Symbol、Boolean、Nil 等等。我们通过 `x.class` 能得知它的数据类型，通过`object_id` 得知它的内存地址



### String（字符串）

```ruby
a = 'asdf' # asdf 将 asdf 赋值给a
a[0] = 'b' # ruby 中一切皆对象
a.object_id # 70123455667 
a[1] = 'c' # c
a.object_id # 70123455667 ，a 不变
b = 'asdf' # 与 a 的值一样
b.object_id # 72343954534，但 object_id 不一样，说明他们的内存地址不一样，和 JavaScript 的引用类型一样，每次赋值都存在堆内存里，所以说 ruby 性能差
# 在 Ruby 中，一切皆对象，比 JavaScript 更加彻底
a.class # String class 方法是判断它的类型
```

字符串的多种赋值方式

```ruby
a = 'asdf' # 用单引号
"something#{a}" # somethingasdf 双引号相当于 javascript 中的模板字符串(``)
%q('asddas'dasda'') # "'asddas'dasda''"  保留你输入的任何值
%Q("sadsd") # "\"\"sadsd\"\"" 转义 
<<-Text
sdsd
dsadsad
dsdas
TEXT # 多行
"asdfgh".reverse # hgfdsa 反转
"hello".include?('o') # true 是否存在字母o
"hello".index('l') # 2
"asdf".sub('s', 'b') # "adbf" 将 s 替换成 b
"asdf".sub!('s', 'b') # "abdf" 
! 有什么用呢，它能改变原值
a = 'asdf' # asdf
a.sub('s', 'b') # abdf
a # asdf  a 的值没有变化
a.sub!('s', 'b') # abdf
a # abdf  a 的值发生改变
a.size # 字符串长度
```



### Integer（整数）/Float（浮点数）

```ruby
66 # 66
66.class # Integer 整数
3.2 # 3.2
3.2.class # Float 浮点数
3.even? # 是否为偶数
3.odd? # 是否为奇数
283.to_s # 转化为 string 
3.times { p 'love' } # 打印三次 love
3 & 1 # 1 
3.232323.round(2) # 小数点保留 2 位
```

如果想把数字1存储在名为 one 的变量中：

```ruby
one = 1
```

同理，如果要赋值数字2，数字1000，就可以如此：

```ruby
two = 2
some_number = 10000
```



### 数组

```ruby
array = [1, 2, 3, 4, 5] # => [1, 2, 3, 4, 5]
```

数组可以包含不同类型的元素

```ruby
[1, "hello", false] # => [1, "hello", false]
```

数组可以被索引，从前面开始

```ruby
array[0] # => 1
array.first # => 1 # 牛逼，这样都可以，array.second 是不是 hello，不妨一试
array[12] # => nil # nil 就是 js 中的 null 的意思吧
```

往数组中添加新值最常见的方法是 push 和 <<

```ruby
array = []
array.push("1")
array.push("2")
puts array[0] # 1
puts array[1] # 2
```

<< 方法略有不同：

```ruby
array = []
array << "3"
array << "4"
puts array[0] # 3
puts array[1] # 4
```

当然，还可以把 `<<` 当作方法来使用，我的意思是说可以用`.` 来调用

```ruby
array = []
array.<<("5")

puts array[0] # 5
```

数组是对象，引用类型

```ruby
a = [] # []
a.object_id # 7012434563
b = a # []
b.object_id # 7012434563 与 a 一样，引用的是同一个内存地址
a << 'foo' # ["foo"]
a # ["foo"]
a.object_id # 7012434563
b # ["foo"]
b.object_id # 7012434563

# 创建方式： 对象字面量[]、还有 Array.new
a = Array.new # []
a = Array.new(3) # [nil, nil, nil] 
a = Array.new(3, 0) # [0,0,0]
```

特别注意

```ruby
a = Array.new(3, 'asdf') # ["asdf", "asdf", "asdf"]
a[0] # "asdf"
a[0][0] = 'b' # b
a[0] # "bsdf"
a # ["bsdf", "bsdf", "bsdf"]
a[0].object_id # 7012838949
a[1].object_id # 7012838949
a[2].object_id # 7012838949
# 因为它们是引用对象，指向同一个引用
# 如何只改变数组中的第一项，不改变其他的，使用 block（块）
a = Array.new(3) { 'asdf' } # ["asdf", "asdf", "asdf"]
a[0].object_id # 7022838393
a[1].object_id # 7323856575
a[2].object_id # 7342657667
```

第三种创建数组的方法

```ruby
arr = %w(foo, bar, baz) # ["foo", "bar", "baz"]
```

数组的常用方法

```ruby
# 以上面 arr 为例子
arr[0] # "foo"
arr[-1] # "baz"
arr[1..2] # 取区间["bar", "baz"]
arr.fetch(0) # foo
arr.fetch(4) # 报错 
arr.fetch(4, "asdf") # "asdf"
arr.length # 3
arr.include?("sdad") # 是否存在sdad ，false
arr.include?('foo') # true
arr.empty?() # 是否为空 false
arr.push('ber') # ["foo", "bar", "baz", "ber"]
arr[7] = 'asdf' # ["foo", "bar", "baz", "ber", nil, nil, nil, "asdf"]
arr.delete("ber") # ["foo", "bar", "baz", nil, nil, nil, "asdf"]
arr.push("bar") # ["foo", "bar", "baz", nil, nil, nil, "asdf", "bar"]
arr.uniq # 取唯一，删除多余的值 ["foo", "bar", "baz", nil, "asdf"]
# arr.uniq! !会改变原数组
arr.shuffle # 颠倒 ["asdf", nil, nil, nil, "baz", "bar", "foo"]
arr1 = [[1,2,3], [4, 5]]
arr.flatten # 扁平化 [1, 2, 3, 4, 5]
```

数组的遍历方法

```ruby
arr = [1, -1, 2, 3, -4]
arr.each { |e| p e } # e 为数组中的每一项， p 为 put 打印， p e 打印每一项值
# 1, -1, 2, 3, -4
arr.reverse_each { |e| p e} # 倒着遍历 -4, 3, 2, -1, 1
arr.each_width_index {|e, i| p [e, i] } # [1, 0] [-1, 1] [2, 2] [3, 3] [-4, 4]
arr.sort # [-4, -1, 1, 2, 3]
arr.select { |e| e > 0} # 选择大于0的元素，[1, 2, 3]
```



### 哈希表：Key-Value数据结构/字典集合

JavaScript 的数据类型中是没有 hash 的，但在 Ruby 中有。它的特点是以键/值对表示

因为在数组中我们用数字索引来获取到值，而 hash 数据结构中可以使用数字、字符串或者其他类型来做索性

> 随便一说，JavaScript 中虽然没有 hash，但是它的 object 的功能就是 hash

哈希就键值对的结合，例如：

```ruby
hash = {"color" => "green", "number" => 5}

hash.keys #=> ['color', 'number']

# 哈希表可以通过键快速地查询
hash['color'] # => 'green'
hash['number'] # => 5

# 查询一个不存在的键会返回 nil
hash['nothing here'] # => nil

# 添加数据
hash['print'] = 27.6 # => 27.6
```

{ } 字面量表示 hash

```ruby
a = { key: 'value' } # {:key => "value"}
b = a # {:key => "value"}
b.object_id # 91860
a.object_id # 91860
a[:key] = 'foo' # foo
a # {:key => "foo"}
b # {:key => "foo"}
```

另一种创建 hash 的方法，new

```ruby
Hash.new # {}
h = Hash.new(3) # {}
h[0] # 3
h[1] # 3
```

哈希的方法

```ruby
h = {a: 1, b: 2}
h[:c] = 3
h # {:a=>1, :b=>2, c=>3}
h[:a] # 1
h.delete(:a) # 1
h # {:b=>2, c=>3}
h.assoc(:b) # 获取 key 和 value [:b, 2]
h.empty?() false 
h.has_value?(2) # 是否有值 2, true
h.has_key?(:b) # 是否有值:b, true
h.keys # [:b, :c]
h.values  # [2, 3]
h.to_a # 变成 array [[:b, 2], [:c, 3]]
h2 = {d: 4}
h.merge(h2) # {:b=>2,:c=>3,:d=>4}
```

hash 的遍历方法

```ruby
h.each { |key, value| p [key, value]} # [:b, 2] [:c, 3]
h.each_key { |key| p key } # :b :c
h.each_value {|v| p v} # 2 3
h.select { |key| key == :b} # {:b=>2}
```



### 集合（Set）

```ruby
require 'set' # 命令行中默认不引用 set
a = Set.new [1, 2] # <Set: {1, 2}>
a.add("foo") # Set: {1, 2, "foo"}>
b = Set.new [2, 3, 4] #Set: {2, 3, 4}>
a & b # Set: {2}>
a | b # Set: {1, 2, ”foo", "3", "4"}>
a <= b # b 是否是 a 的子集， false
b <= a # a 是否是 b 的子集， false
```



### 范围（Range）

闭区间，使用两个点（..）来表示

```ruby
r = 1..5 # 1, 2, 3, 4, 5 
r.include?(2) # true
a = [1, 2, 3, 4]
a[1..2] # [2, 3]
```

开区间，使用三个点（...）来表示

```ruby
r = 1...5 # 包括 1, 2, 3, 4
```



### 其他数据类型

当然，还有一些会用但比较简单的数据类型，这里简单带过

Symbol：符号：不可变类型。优点，查找速度快，缺点是不会被垃圾回收，造成内存不够的可能

Boolean：布尔值

Nil：空值

Regexp：正则表达式



## 函数（方法）

```ruby
def double(x)
    x * 2
end

# 函数（以及所在的块）隐式地返回最后语句的值
double(2) # => 4

# 当不存在歧义的时候括号可有可无
double 3 # => 6

double double 3 # => 12

def sum(x, y)
    x + y
end

# 方法的参数通过逗号分隔
sum 3, 4 #=> 7

sum sum(3, 4), 5 => 12

# yield 
# 所有的方法都有一个隐式的，可选的块参数
# 可以用 ‘yield’ 关键字调用

def surround
    puts "{"
    yield
    puts "}"
end

surround { puts "hello world" }

# {
# hello world
# }
# => nil

```



## 面向对象编程

### 对象

在 Ruby 中，（几乎）所有东西都是对象

```ruby
# 数字是对象
3.class #=> Interger
3.to_s #=> "3"

# 字符串是对象
"Hello".class #=> String

# 方法也是对象
"Hello".method(:class).class => Method
```



### 类（Class）

> 类 = 属性 + 方法

在前面，我们谈到了 Ruby 的对象，我们说 Ruby 中的任何东西都是对象。而作为一种面向对象的编程语言，Ruby 使用了类和对象的概念

“类”是一种定义对象的方法，如图书、狗、自行车

“对象”有两个主要特征：数据（属性）和行为（方法）

语法很简单，例如：

```ruby
class Book
end
```

我们用 class 语句定义 Book 并以 end 结束

对象是类的实例。我们通过调用 .new 方法创建一个实例

```ruby
book = Book.new
```

这里的书 是**书类**的 一个对象（或实例）

我们定义书类将具有 4 个属性：书名、作者、星、价格

我们重新定义我们的类 Book ：

```ruby
class Book
    def initialize(title, author, star, price)
    	@title = title
        @author = author
        @star = star
        @price = price
    end
end
```

我们将 initialize 方法成为构造方法，当我们要使用这个类时，就可以这样：

```ruby
book1 = Book.new('金瓶梅', '兰陵笑笑生', '五星', 16.8)
```

我们还可以定义书的行为：读书

```ruby
class Book
    def initialize(title, author, star, price)
    	@title = title
        @author = author
        @star = star
        @price = price
    end
    
    def read
        puts "我读 #{@title}，这本书的作者是 #{@author}，推荐指数 #{@star}，价格 #{@parice} 元"
    end
end
```

使用该类创建对象的实例代码如下：

```ruby
book1 = Book.new('金瓶梅', '兰陵笑笑生', '五星', 16.8)
book2 = Book.new('南回归线', '亨利·米勒', '五星', 66.6)

book1.read # 我读金瓶梅，这本书的作者是兰陵笑笑生，推荐指数五星，价格 16.8 元
book12.read # 我读南回归线，这本书的作者是亨利·米勒，推荐指数五星，价格 66.6 元
```





## 参考资料

- [Y分钟速成X](https://learnxinyminutes.com/docs/zh-cn/ruby-cn/)
- [Learning Ruby: From Zero to Hero](https://www.freecodecamp.org/news/learning-ruby-from-zero-to-hero-90ad4eecc82d)
