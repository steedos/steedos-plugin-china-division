# 华炎魔方项目 字段级联选择 示例
以省、市、区为例

## 开发过程
1. 创建项目
2. 在对象管理界面创建对应省、市、区及发货单对象
3. 引入china-division包，在router中导入数据
4. 使用dx工具下载对象源码
5. 修改发货单对象的源文件，增加属性，实现级联选择

## 代码示例

```yml
reference_to_field: code__c
depend_on:
  - province__c 
filtersFunction: !!js/function |
  function (filters, dependValues) {
    if(dependValues){
      if (dependValues.province__c) {
        return "(province_code__c eq '" + dependValues.province__c + "')";
      } else {
        return "(null eq -1)";
      }
    }
  }
```

## 如何运行本示例

```shell
yarn
yarn start
```

在浏览器输入网址http://127.0.0.1:5000/api/data/provinces/init 导入初始数据