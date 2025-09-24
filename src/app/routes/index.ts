import express from 'express';
import { UserRouters } from '../modules/User/user.routes';
import { MessageRouters } from '../modules/Messages/message.route';
import { NotificationsRouters } from '../modules/Notification/notification.route';
import { AssetRouters } from '../modules/Asset/asset.route';
import { AuthRouters } from '../modules/Auth/Auth.routes';
import { SubscriptionRoutes } from '../modules/Subscription/Subscription.routes';
import { MotivationRoutes } from '../modules/Motivation/Motivation.routes';
import { VisionRoutes } from '../modules/Vision/Vision.routes';
import { FollowRoutes } from '../modules/follow/follow.routes';
import { CommunityRoutes } from '../modules/community/community.routes';
import { MetaRoutes } from '../modules/meta/analytics.route';
import { GoalRoutes } from '../modules/goal/goal.routes';

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
  {
    path: '/motivation',
    route: MotivationRoutes,
  },
  {
    path: '/vision',
    route: VisionRoutes,
  },
  {
    path: '/follow',
    route: FollowRoutes,
  },
  {
    path: '/community',
    route: CommunityRoutes,
  },
  {
    path: '/meta',
    route: MetaRoutes,
  },
  {
    path: '/goal',
    route: GoalRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
