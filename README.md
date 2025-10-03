# 🎮 Colete o Orbe!

Bem-vindo ao "Colete o Orbe!", um jogo casual para dispositivos móveis onde sua habilidade de inclinar o celular é a chave para a vitória. Controle a bolinha para coletar os orbes que aparecem na tela, correndo contra o tempo para alcançar a maior pontuação possível.

Este projeto foi desenvolvido como um estudo prático das capacidades do **React Native** e **Expo**, explorando o uso de sensores de hardware (giroscópio), manipulação de áudio, e armazenamento local de dados.

## ✨ Funcionalidades

* **Controle por Giroscópio:** Movimente o jogador inclinando o seu dispositivo.
* **Sistema de Pontuação:** Cada orbe coletado aumenta sua pontuação.
* **Modos de Dificuldade:** Escolha entre os modos Fácil (30s), Médio (15s) e Difícil (10s), cada um com um temporizador diferente.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **[Expo](https://expo.dev/)**: Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e a publicação de apps React Native.
* **[Expo Sensors](https://docs.expo.dev/versions/latest/sdk/sensors/)**: Biblioteca para acessar sensores de hardware do dispositivo, como o Giroscópio.

## 🚀 Como Rodar o Projeto

Para rodar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo.

**Pré-requisitos:**
* Node.js e npm/yarn instalados.
* Expo Go instalado no seu dispositivo móvel (Android ou iOS).

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd SEU-REPOSITORIO
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *ou, se você usa yarn:*
    ```bash
    yarn install
    ```

4.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start
    ```

5.  **Abra no seu celular:**
    Escaneie o QR Code exibido no terminal com o aplicativo Expo Go.

## 📂 Estrutura do Projeto

* `App.tsx`: Arquivo principal que contém toda a lógica e os componentes do jogo.
* `metro.config.js`: Arquivo de configuração para o Metro Bundler, ajustado para reconhecer arquivos de áudio (`.mp3`, `.wav`).
* `assets/`: Pasta que armazena todos os recursos estáticos.
    * `assets/sounds/`: Contém os arquivos de áudio do jogo (ex: `collect.mp3`).
    * `assets/images/`: (Opcional) Pode ser usada para armazenar imagens, como a capa do jogo ou sprites.

## Autores
- [Matheus](https://github.com/Matheus2614) - matheus.wincler.senai@gmail.com - (https://www.linkedin.com/in/matheus-wincler-968439315/)
