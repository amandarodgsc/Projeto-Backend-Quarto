module.exports = app => {
  // Importar os controladores de tarefa
  const taskController = require('../controllers/taskController');

  app.post('/register', app.app.controllers.user.register);
  app.post('/auth', app.app.controllers.user.auth);
  app.post('/auth/forgot_password', app.app.controllers.user.forgotPassword);
  app.post('/auth/reset_password', app.app.controllers.user.resetPassword);
  
  app.route('/user')
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.user.userProfile);
  
  app.route('/projects')
    .all(app.app.middlewares.authToken.authenticationJWT)
    .post(app.app.controllers.project.createProject)
    .get(app.app.controllers.project.getProject);
  
  app.route('/projects/:projectId')
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(app.app.controllers.project.getProjectById)
    .delete(app.app.controllers.project.removeProject)
    .put(app.app.controllers.project.updateProject);
  
  // Rotas para operações CRUD de tarefas
  app.route('/projects/:projectId/tasks')
    .all(app.app.middlewares.authToken.authenticationJWT)
    .post(taskController.createTask); // Criar uma nova tarefa associada a um projeto específico

  app.route('/projects/:projectId/tasks')
    .all(app.app.middlewares.authToken.authenticationJWT)
    .get(taskController.getTasksByProject); // Obter todas as tarefas associadas a um projeto específico

  app.route('/tasks/:taskId')
    .all(app.app.middlewares.authToken.authenticationJWT)
    .put(taskController.updateTask) // Atualizar uma tarefa existente
    .delete(taskController.deleteTask); // Excluir uma tarefa existente
};
