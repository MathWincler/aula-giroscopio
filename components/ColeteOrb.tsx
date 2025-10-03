import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');
const PLAYER_SIZE = 50;
const ORB_SIZE = 30;
const SENSITIVITY = 10;

const generateRandomPosition = () => {
  const position = {
    x: Math.random() * (width - ORB_SIZE),
    y: Math.random() * (height - ORB_SIZE),
  };
  return position;
};

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [playerPosition, setPlayerPosition] = useState({ x: width / 2, y: height / 2 });
  const [orbPosition, setOrbPosition] = useState(generateRandomPosition());
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const soundObject = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundObject.current.loadAsync(require('../assets/sounds/collect.mp3'));
      } catch (error) {
        console.error("Não foi possível carregar o som", error);
      }
    };
    
    loadSound();

    return () => {
      soundObject.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    let subscription;
    if (gameMode) {
      Gyroscope.setUpdateInterval(16);
      subscription = Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [gameMode]);

  useEffect(() => {
    let newX = playerPosition.x + data.y * SENSITIVITY;
    let newY = playerPosition.y + data.x * SENSITIVITY;

    if (newX < 0) {
      newX = 0;
    } else if (newX > width - PLAYER_SIZE) {
      newX = width - PLAYER_SIZE;
    }

    if (newY < 0) {
      newY = 0;
    } else if (newY > height - PLAYER_SIZE) {
      newY = height - PLAYER_SIZE;
    }

    setPlayerPosition({ x: newX, y: newY });
  }, [data]);

  useEffect(() => {
    const playerCenterX = playerPosition.x + PLAYER_SIZE / 2;
    const playerCenterY = playerPosition.y + PLAYER_SIZE / 2;
    const orbCenterX = orbPosition.x + ORB_SIZE / 2;
    const orbCenterY = orbPosition.y + ORB_SIZE / 2;

    const dx = playerCenterX - orbCenterX;
    const dy = playerCenterY - orbCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (PLAYER_SIZE / 2) + (ORB_SIZE / 2)) {
      setOrbPosition(generateRandomPosition());
      setScore(prevScore => prevScore + 1);

      const playSound = async () => {
        try {
          // 'replayAsync' toca o som do início, mesmo que ele já esteja tocando.
          await soundObject.current.replayAsync();
        } catch (error) {
          console.error("Não foi possível tocar o som", error);
        }
      };
      playSound();
    }
  }, [playerPosition]);

  useEffect(() => {
    if (gameMode && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameMode]);

  const startGame = (mode) => {
    let time;
    if (mode === 'easy') {
      time = 30;
    } else if (mode === 'medium') {
      time = 15;
    } else {
      time = 10;
    }
    setGameMode(mode);
    setTimeLeft(time);
    setScore(0);
    setPlayerPosition({ x: width / 2, y: height / 2 });
    setOrbPosition(generateRandomPosition());
  };

  const restartGame = () => {
    setGameMode(null);
    setScore(0);
  };

  const renderGame = () => (
    <>
      <Text style={styles.scoreText}>Pontuação: {score}</Text>
      <Text style={styles.timerText}>Tempo: {timeLeft}</Text>

      <View
        style={[
          styles.orb,
          {
            left: orbPosition.x,
            top: orbPosition.y,
          },
        ]}
      />

      <View
        style={[
          styles.player,
          {
            left: playerPosition.x,
            top: playerPosition.y,
          },
        ]}
      />
    </>
  );

  const renderStartScreen = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.title}>Bem-vindo ao Colete o Orbe!</Text>
      <Text style={styles.description}>
        Incline seu celular para controlar a bolinha laranja e colete os orbes azuis antes que o tempo acabe.
      </Text>
      <TouchableOpacity style={styles.button1} onPress={() => startGame('easy')}>
        <Text style={styles.buttonText}>Fácil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={() => startGame('medium')}>
        <Text style={styles.buttonText}>Médio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button3} onPress={() => startGame('hard')}>
        <Text style={styles.buttonText}>Difícil</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEndScreen = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.title}>Fim de Jogo!</Text>
      <Text style={styles.finalScoreText}>Você coletou {score} orbes.</Text>
      <TouchableOpacity style={styles.button} onPress={restartGame}>
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {gameMode === null ? renderStartScreen() : (timeLeft === 0 ? renderEndScreen() : renderGame())}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreText: {
    position: 'absolute',
    top: 60,
    left: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerText: {
    position: 'absolute',
    top: 60,
    right: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  finalScoreText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  button1: {
    backgroundColor: '#28db0dff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  button2: {
    backgroundColor: '#c3d91fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  button3: {
    backgroundColor: '#ff0000ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  player: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    borderRadius: PLAYER_SIZE / 2,
    backgroundColor: '#7000b6ff',
    borderWidth: 2,
    borderColor: '#7000b6ff',
  },
  orb: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: '#3498db',
    borderWidth: 2,
    borderColor: '#3498db',
  },
});