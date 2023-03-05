const data = {
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
    }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      config: {
        backgroundColor: '#003049',
        textColor: '#FFF'
      }
    },
    'column-2': {
      id: 'column-2',
      title: 'Doing',
      taskIds: [],
      config: {
        backgroundColor: '#003049',
        textColor: '#FFF'
      }
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
      config: {
        backgroundColor: '#003049',
        textColor: '#FFF'
      }
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export default data