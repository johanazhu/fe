# 前端学 Ruby：熟悉 Ruby 语法



## 写在前面

> 我们当然希望能在本地中执行代码，如果你还没有只是看看，还没安装 ruby，可以在[这个网站](https://replit.com/languages/ruby)在线编写代码

## Ruby 是什么

### 弱类型语言

Ruby 是一门弱类型语言，和 JavaScript 一样。如果你学过前端，对此接受程度会很高

```ruby
a = 5;
a = 'Hello'
puts a # Hello
```

### 动态语言

### 命名风格

通常使用 snake_case 风格的变量名

> snake_case 风格即短语内的各个单词之间以下划线做间隔

使用有意义的变量名

```ruby
path_to_project_root = '/good/name/'
path = '/bad/name/'
```

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

打印输出，并在末尾家换行符

```ruby
puts "I'm printing!"
#=> I'm printing!
#=> nil
```

打印输出，不加换行符

```ruby
print "I'm printing!"
#=> I'm printing! => nil
```

## 数据类型

如果想把数字1存储在名为 one 的变量中：

```ruby
one = 1
```

同理，如果要赋值数字2，数字1000，就可以如此：

```ruby
two = 2
some_number = 10000
```

除了 number 类型外，还有其他数据类型，如 boolean、string、symbol、float、hash、array 等

```ruby
# boolean
true_boolean = true
false_boolean = false

# string
my_string = 'Johnny Joestar'

# symbol
a_symbol = :my_symbol

# float 
book_price = 15.80
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
array.first # => 1 # 牛逼，这样都可以，array.second 是不是 hello
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

### 哈希表

前端的数据结构中是没有 hash 的，但是在 Ruby 中有。它的特点是以键/值对表示

因为在数组中我们用数字索引来获取到值，而 hash 数据结构中可以使用数字、字符串或者其他类型来做索性

> 随便一说，JavaScript 中虽然没有 hash，但是对象的功能就是 hash

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

## 条件语句：控制流

通过 `if...else...` 评估真或假。如果为真，它会执行语句中的内容。例如：

```ruby
if true
    puts "Hello Ruby If"
end

if 2 > 1
    puts "2 大于 1"
end
```

与 JavaScript 相比，它没有更多的括号，只写必要的东西，但是因为没有中括号，所以当要结束时，需要用 `end` 来做分离

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

## 循环语句/迭代器

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

## 函数

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

## 类和对象

在前面，我们谈到了 Ruby 的对象，我们说 Ruby 中的任何东西都是对象。而作为一种面向对象的编程语言，Ruby 使用了类和对象的概念

“类”是一种定义对象的方法，如图书、狗、自行车

“对象”有两个主要特征：数据（属性）和行为（方法）

Ruby 的类相关语法：

```ruby
Class Book
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







用 class 关键字定义一个类

```ruby
class Human
    # 一个类变量，它被这个类的所有实例变量共享
    @@species = "H. sapiens"
    
    # 基本构造函数
    def initialize(name, age = 0)
        #将参数值赋值给实例变量 "name"
        @name = name
        #如果没有给出 age，那么会采用参数列表中的默认值
        @age = age
    end
    
    # 基本的 setter 方法
    def name=(name)
        @name = name
    end
    
    #基本的 getter 方法
    def name
        @name
    end
    
    # 以上的功能也可以用下面的 attr_accessor 来封装
  	attr_accessor :name

    # Getter/setter 方法也可以像这样单独创建
    attr_reader :name
    attr_writer :name

    # 类方法通过使用 self 与实例方法区别开来。
    # 它只能通过类来调用，不能通过实例调用。
    def self.say(msg)
       puts "#{msg}"
    end

    def species
       @@species
    end
end
```



## module，常见的元编程，block

事实上，常量只能在类、模块里定义，绝不能在方法里定义。



通常有如下规则。 以“$”开头的变量：全局变量。 以“@”开头的变量：实例变量。以“@@”开头的变量：类变量。 以小写字母或者下划线（_）开头的变量：局部变量。

尽管 Ruby 只用很少的符号，而且偏向使用英文单词做关键字，但是也用一些符号装饰 Ruby。在 Ruby 中，不需要提前声明变量。Ruby 使用简单的命名约定指明变量的作用域。

- `var` 可能是局部变量
- `@var` 是实例变量
- `$var` 是全局变量

这些符号能让程序员轻易识别变量的作用。此外，实例成员前面无需加上烦人的 `self.`。



## 注释

```ruby
# 单行注释
=begin
	多行注释
=end
```



## 参考资料

- [Y分钟速成X](https://learnxinyminutes.com/docs/zh-cn/ruby-cn/)
- [Learning Ruby: From Zero to Hero](https://www.freecodecamp.org/news/learning-ruby-from-zero-to-hero-90ad4eecc82d)

https://v3u.cn/a_id_257

https://v3u.cn/a_id_256
