import type { User } from './types';
import { createIoCContainer } from "./ioc";

const IoCC = createIoCContainer()

const renderUsers = async () => {
  const usersService = IoCC.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  IoCC.register('apiConfig', config.api);

  renderUsers();
};

window.onload = () => {
  const logger = IoCC.resolve('logger');

  logger.info('Page is loaded.');

  app();
};
