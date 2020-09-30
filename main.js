var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

const app = new Vue({
  el:"#app",
  watch: {
    todos: {
      handler: function(todos){
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  data: {
    todos: [],
    current: -1,
    options:[
      {value: -1, label: "すべて"},
      {value: 0, label: "作業中"},
      {value:1, label: "完了"}
    ]
  },
  methods: {
    // TODO add processing
    doAdd: function(event, value) {
      var name = this.$refs.name
      if(!name.value,length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        name: name.value,
        state: 0
      })
      name.value = ""
    },
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1
    },
    doRemove: function(item){
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
  },
  created()  {
    this.todos = todoStorage.fetch()
  },
  computed: {
    computedTodos: function(){
      return this.todos.filter(function(el){
        return this.current < 0 ? true: this.current === el.state
      },this)
    }
  }
})