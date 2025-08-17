{ pkgs, ... }: {
  idx = {
    # Which nixpkgs channel to use.
    channel = "stable-24.05";

    # Packages you want installed in the environment
    packages = [
      pkgs.nodejs_20
      pkgs.nodePackages.nodemon
    ];

    # Sets environment variables in the workspace
    env = { };

    root = "./frontend";

    extensions = [
      # "vscodevim.vim"
    ];

    previews = {
      enable = true;
      web = {
        command = [ "bash" "-c" "npm run dev" ];
        manager = "web";
        env = {
          PORT = "$PORT";
        };
      };
    };

    workspace = {
      onCreate = {
        install-frontend = ''
          cd frontend && npm install
        '';
      };
      onStart = {
        start-frontend = ''
          cd frontend && npm run dev
        '';
      };
    };
  };
}
