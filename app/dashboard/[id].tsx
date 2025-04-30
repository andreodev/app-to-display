import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { representacaoSet } from './representanteDados';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

export default function DetalhesDoEstado() {
  const { id } = useLocalSearchParams();
  const estadoDetalhes = representacaoSet.filter(estado => estado.estado_id === id);


  return (
    <View style={styles.container}>
      <ScrollView>
        {estadoDetalhes.length > 0 ? (
          estadoDetalhes.map((estado, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="business" size={24} color="#3498db" />
                <Text style={styles.cardTitle}>{estado.representacao}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Feather name="phone" size={20} color="#555" />
                <Text 
                  style={styles.cardContent}
                >
                  {estado.telefone}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons 
                  name={estado.email ? "email" : "email"} 
                  size={20} 
                  color={estado.email ? "#555" : "#aaa"} 
                />
                <Text 
                  style={[styles.cardContent, !estado.email && styles.disabledText]}
                >
                  {estado.email ? estado.email : 'Não disponível'}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome name="exclamation-circle" size={30} color="#ccc" />
            <Text style={styles.content}>Nenhuma representação encontrada para este estado.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  disabledText: {
    color: '#aaa',
  },
  content: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});