module.exports = {
  configureWebpack:{
    resolve:{
      //创建别名，可以方便写路径，@为src
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'serves':'@/serves',
        'views':'@/pages',
        'static':'@/static'
      }
    }
  }
}
