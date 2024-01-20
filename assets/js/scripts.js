document.addEventListener("DOMContentLoaded", () => {
    const newTask = document.getElementById("input-newtask")
    const addBtn = document.getElementById("btn-newtask")
    const totalTask = document.getElementById("task-total")
    const doneTask = document.getElementById("task-closed")
    const listTaskContainer = document.getElementById("task-list")
  
    let tareas = [
      { id: 1, nombre: "Ordenar", completado: false },
      { id: 2, nombre: "Cocinar", completado: false },
      { id: 3, nombre: "Hacer ejercicio", completado: false }
    ];  
  
    const todoListApp = {
      updateTaskList: function () {
        let html = '';
        tareas.forEach((tarea) => {
          const statusBtnIcon = tarea.completado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill'
          html += `<tr>
                      <td>${tarea.id}</td>
                      <td>${tarea.nombre}</td>
                      <td><i class="${statusBtnIcon} status-toggle" data-id="${tarea.id}"></i></td>
                      <td><i class="bi bi-trash-fill delete-btn" data-id="${tarea.id}"></i></td>
                  </tr>`
        });
  
        listTaskContainer.innerHTML = html
        totalTask.textContent = tareas.length
        doneTask.textContent = tareas.filter((tarea) => tarea.completado).length
      },
  
      addTask: function (taskName) {
        if (taskName.trim() !== '') {
          const newTaskObject = {
            id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
            nombre: taskName,
            completado: false
          };
          tareas.push(newTaskObject)
          this.updateTaskList()
        } else {
          newTask.classList.add('is-invalid')
        }
      },
  
      deleteTask: function (id) {
        const index = tareas.findIndex((tarea) => tarea.id === id)
        if (index !== -1) {
          tareas.splice(index, 1)
          this.updateTaskList()
        }
      },
  
      toggleCompletion: function (id) {
        const taskIndex = tareas.findIndex((tarea) => tarea.id === id)
        if (taskIndex !== -1) {
          tareas[taskIndex].completado = !tareas[taskIndex].completado
          this.updateTaskList()
        }
      }
    }
  
    listTaskContainer.addEventListener("click", (event) => {
      const target = event.target;
      const id = parseInt(target.getAttribute('data-id'))
  
      if (target.classList.contains('status-toggle')) {
        todoListApp.toggleCompletion(id)
      } else if (target.classList.contains('delete-btn')) {
        todoListApp.deleteTask(id)
      }
    })
  
    addBtn.addEventListener("click", () => {
      todoListApp.addTask(newTask.value)
      newTask.value = ''
      newTask.focus()
    })
  
    newTask.addEventListener("click", () => {
      newTask.classList.remove('is-invalid')
    })
  
    todoListApp.updateTaskList()
  })
  
  
  

 
  

    
