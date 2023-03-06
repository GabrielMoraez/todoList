const data = {
  boards:{
    'board-1': {
      id: 'board-1',
      title: "Gabriel's To-Do List Project",
      columns: ['column-1', 'column-2', 'column-3'],
    },
    'board-2': {
      id: 'board-2',
      title: "Bruna's To-Do List Project",
      columns: ['column-4', 'column-5', 'column-6'],
    },
    'board-3': {
      id: 'board-3',
      title: "Doguinho's To-Do List Project",
      columns: ['column-7', 'column-8', 'column-9'],
    },
    'board-4': {
      id: 'board-4',
      title: "Rogerinho's To-Do List Project",
      columns: ['column-10', 'column-11', 'column-12'],
    }
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Take out the garbage',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 1,
    },
    'task-2': {
      id: 'task-2',
      title: 'Watch my favorite show',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
    'task-3': {
      id: 'task-3',
      title: 'Charge my phone',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
    'task-4':{
      id: 'task-4',
      title: 'Cook dinner',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 3,
    },
    'task-5': {
      id: 'task-5',
      title: 'Trabalhar',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 1,
    },
    'task-6': {
      id: 'task-6',
      title: 'Comer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
    'task-7': {
      id: 'task-7',
      title: 'Ver TV',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
    'task-8':{
      id: 'task-8',
      title: 'Ler',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 3,
    },
    'task-9': {
      id: 'task-9',
      title: 'Dormir',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 1,
    },
    'task-10': {
      id: 'task-10',
      title: 'Comer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
    'task-11': {
      id: 'task-11',
      title: 'Fazer coco',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 1,
    },
    'task-12': {
      id: 'task-12',
      title: 'Fazer xixi',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
    'task-13': {
      id: 'task-13',
      title: 'Morder o doguinho',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nibh lobortis, blandit dui sit amet, finibus dui.',
      priority: 2,
    },
  },
  columns : {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-2': {
      id: 'column-2',
      title: 'Doing',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-4': {
      id: 'column-4',
      title: 'To do',
      taskIds: ['task-5', 'task-6', 'task-7', 'task-8'],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-5': {
      id: 'column-5',
      title: 'Doing',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-6': {
      id: 'column-6',
      title: 'Done',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-7': {
      id: 'column-7',
      title: 'To do',
      taskIds: ['task-9', 'task-10'],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-8': {
      id: 'column-8',
      title: 'Doing',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-9': {
      id: 'column-9',
      title: 'Done',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-10': {
      id: 'column-10',
      title: 'To do',
      taskIds: ['task-11', 'task-12', 'task-13'],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-11': {
      id: 'column-11',
      title: 'Doing',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    },
    'column-12': {
      id: 'column-12',
      title: 'Done',
      taskIds: [],
      config: {
        backgroundColor: '#8e7d72',
        textColor: '#FFF'
      }
    }
  },
  activeBoardId: 'board-1'
}

export default data