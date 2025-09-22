import express from 'express';
import { UserRouters } from '../modules/User/user.routes';
import { MessageRouters } from '../modules/Messages/message.route';
import { NotificationsRouters } from '../modules/Notification/notification.route';
import { AssetRouters } from '../modules/Asset/asset.route';
import { AuthRouters } from '../modules/Auth/Auth.routes';
import { SubscriptionRoutes } from '../modules/Subscription/Subscription.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/messages',
    route: MessageRouters,
  },
  {
    path: '/notifications',
    route: NotificationsRouters,
  },
  {
    path: '/assets',
    route: AssetRouters,
  },
  {
    path: '/subscription',
    route: SubscriptionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
