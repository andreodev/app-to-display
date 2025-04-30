import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function LoginPage() {
  // Animação para os botões
  const router = useRouter();
  const buttonScale = new Animated.Value(1);

  const handlePressIn = (name: string) => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
    router.push(`/dashboard/${name}`);
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho Premium */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../assets/images/Logo-Colson.png')}
            style={[styles.logo, { tintColor: '#0F191E' }]}
            resizeMode="contain"
          />
          <View style={styles.divider} />
          <Image
            source={require('../assets/images/Logo-Casterine.png')}
            style={[styles.logo, { tintColor: '#EA1C2F' }]}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Botões com Ícones e Efeitos */}
      <View style={styles.buttonsContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPressIn={() => handlePressIn('representante')}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <MaterialIcons name="contact-phone" size={32} color="white" />
              <Text style={styles.buttonText}>Receber contato de um representante</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" style={styles.arrowIcon} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPressIn={() => handlePressIn('map')}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="location-sharp" size={32} color="white" />
              <Text style={styles.buttonText}>Localizar representante na minha região</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" style={styles.arrowIcon} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.button, styles.button3]}
            onPressIn={() => handlePressIn('roleta')}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <View style={styles.buttonContent}>
              <FontAwesome name="gift" size={32} color="white" />
              <Text style={styles.buttonText}>Ganhar prêmios incríveis</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" style={styles.arrowIcon} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Rodapé Clean */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2023 Casterine & Colson</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 60,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#919396',
    marginHorizontal: 20,
    opacity: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#919396',
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  button: {
    height: 100,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
    maxWidth: '80%',
  },
  button1: {
    backgroundColor: '#FA7D55',
    shadowColor: '#FA7D55',
  },
  button2: {
    backgroundColor: '#EA1C2F',
    shadowColor: '#EA1C2F',
  },
  button3: {
    backgroundColor: '#2F2F10',
    shadowColor: '#2F2F10',
  },
  arrowIcon: {
    opacity: 0.8,
  },
  footer: {
    paddingBottom: 20,
  },
  footerText: {
    color: '#919396',
    textAlign: 'center',
    fontSize: 12,
  },
});