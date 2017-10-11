//todo change project-name and git repo、ref
module.exports = {
  apps : [
    {
      name      : 'dev-project-name',
      script    : 'backend/index.js',
      exec_mode : 'cluster',
      instance  : 1,
      env: {
        NODE_ENV: 'development',
        PORT: 8000,
      },
      env_production : {
        NODE_ENV: 'production'
      },
      env_qa: {
        NODE_ENV: 'qa',
        PORT: 3333,
      },
    },
  ],
  deploy : {
    development: {
      user: 'root',
      host: [ 'dev-server' ],
      repo: 'git@gitlab.shinezoneserver.com:Shinezone-WEB/Shinezone-WEB-Game4Us-Frontend.git',
      ref: 'origin/release/1.1.2',
      path: '/data2/www/dev-project-name',
      'post-setup' : '[ ! -d /data2/www/dev-project-name/source/dist ] && mkdir -p /data2/www/dev-project-name/source/dist; ' +
      '[ ! -d /data2/www/dev-project-name/source/backend/logs ] && mkdir -p /data2/www/dev-project-name/source/backend/logs ',

      'pre-deploy-local' : 'scp -r dist/* root@dev-server:/data2/www/dev-project-name/source/dist',

      'post-deploy' : 'cd /data2/www/dev-project-name/source/backend && npm install && cd .. && pm2 startOrRestart ecosystem.config.js --env development',
    },

  }
};
