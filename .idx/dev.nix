{pkgs}: {
  packages = with pkgs; [
    nodejs_20
    nodePackages.npm
    git
    docker
    docker-compose
    python3
    python3Packages.pip
    terraform
    awscli2
    google-cloud-sdk
    kubectl
    k9s
  ];
  
  idx.workspace.onCreate = {
    createGitRepository = ''
      if [ ! -d .git ]; then
        git init
        git add .
        git commit -m "Initial commit"
      fi
    '';
    installDependencies = ''
      npm install
    '';
    setupHusky = ''
      npx husky install
    '';
  };

  idx.previews = {
    enable = true;
    previews = [
      {
        command = ["npm" "run" "dev"];
        manager = "web";
        id = "web";
        port = 3000;
      }
      {
        command = ["npm" "run" "storybook"];
        manager = "web";
        id = "storybook";
        port = 6006;
      }
      {
        command = ["npm" "run" "test:coverage"];
        manager = "web";
        id = "coverage";
        port = 8080;
      }
    ];
  };
}
