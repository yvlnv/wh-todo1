// our data
const state = {
    todotasks: [],
    donetasks: []
}

// instead of => { return our_html }
const view = (state) => `
    <section>
        <h1>Todo App</h1>
        <ul>
            ${state.todotasks.map(task => `<li><button onclick="app.run('markdone', ${task.id});">Mark as done</button> ${task.text}</li>`).join("")}
            ${state.donetasks.map(task => `<li><button onclick="app.run('delete', ${task.id});">Delete</button> ${task.text}</li>`).join("")}
            </ul>
    </section>
    <section>
        <form onsubmit="app.run('add', this);return false;">
            <input name="task" placeholder="add a task" />
            <button>Add</button>
        </form>
    </section>
`
// all update func return a state
const update = {
    add: (state, form) => {
        // access data in a form
        const data = new FormData(form)
        const task = {
            id: window.crypto.getRandomValues(new Uint8Array(3)).join(""),
            text: data.get('task'),
            status: 0
        }
        state.todotasks.push(task)
        return state
    },
    markdone: (state, task_id) => {
        for (t of state.todotasks) {
            if (t.id == task_id) {
                const task = t
                const index = state.todotasks.indexOf(task)
                state.todotasks.splice(index, 1)
                state.donetasks.push(task)
                return state
            }
        }
    },
    delete: (state, task_id) => {
        for (t of state.donetasks) {
            if (t.id == task_id) {
                const task = t
                const index = state.donetasks.indexOf(task)
                state.donetasks.splice(index, 1)
                return state
            }
        }
    }
}

app.start('todoApp', state, view, update)
