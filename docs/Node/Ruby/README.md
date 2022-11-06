# 前端学Ruby



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



### 算术操作

```ruby
1 + 1 #=>2
7 - 1 #=> 6
10 * 9 #=> 90
42 / 7 #=> 6
2 ** 5 #=> 32 2的5次方
5 % 3 #=> 2
```



### 位运算符

```ruby
3 & 5 #=> 1
3 | 5 #=> 7
3 ^ 5 #=> 6
```





## 打印输出

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



### 变量

```ruby
x = 25 #=> 25
x #=> 25
```

> 注意赋值语句返回了赋的值，这意味着你可以用多重赋值语句



```ruby
x = y = 10 #=> 10
x #=> 10
y #=> 10
```



### 命名风格

通常使用 snake_case 风格的变量名

> snake_case 风格即短语内的各个单词之间以下划线做间隔

使用有意义的变量名

```ruby
path_to_project_root = '/good/name/'
path = '/bad/name/'
```



### 数组

```ruby
array = [1, 2, 3, 4, 5] #=> [1, 2, 3, 4, 5]
```

数组可以包含不同类型的元素

```ruby
[1, "hello", false] #=> [1, "hello", false]
```

数组可以被索引，从前面开始

```ruby
array[0] #=> 1
array.first #=> 1 # 牛逼，这样都可以，array.second 是不是 hello
array[12] #=> nil # nil 就是 js 中的 null 的意思吧
```



### 哈希表

哈希表是 Ruby 的主要键/值对表示法

哈希表由大括号表示

```ruby
hash = {"color" => "green", "number" => 5}

hash.keys #=> ['color', 'number']

# 哈希表可以通过键快速地查询
hash['color'] #=> 'green'
hash['number'] #=> 5

# 查询一个不存在的键会返回 nil
hash['nothing here'] #=> nil
```





### 控制流

```ruby
if true
    "if statement"
elsif false
    "else if, optional"
else
    "else, alse optional"
end
```



### 循环

```ruby
for counter in 1..5
    puts "iteration #{counter}"
end

#=> iteration 1
#=> iteration 2
#=> iteration 3
#=> iteration 4
#=> iteration 5

# 但是，没有人用 for 循环，因为有 “each" 方法，它使用起来更符合 js 的写法
(1..5).each do |counter|
    puts "iteration #{counter}"
end
#=> iteration 1
#=> iteration 2
#=> iteration 3
#=> iteration 4
#=> iteration 5

# 你也可以将块包含在一个大括号中：
(1..5).each { |counter| puts "iteration #{counter}" }
```





### 函数

```ruby
def double(x)
    x * 2
end

# 函数（以及所在的块）隐式地返回最后语句的值
double(2) #=> 4

# 当不存在歧义的时候括号可有可无
double 3 #=> 6

double double 3 #=> 12

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





### 类

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







## 参考资料

- [Y分钟速成X](https://learnxinyminutes.com/docs/zh-cn/ruby-cn/)





