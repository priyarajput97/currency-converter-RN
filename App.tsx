import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ConversionScreen from './src/screens/Conversion';
import HistoryScreen from './src/screens/History';
import {theme} from './src/utils/theme';

const Tab = createBottomTabNavigator();

const commonTabStyles = {
  tabBarActiveTintColor: theme.white,
  tabBarActiveBackgroundColor: theme.primary,
  tabBarIcon: () => null,
  headerStyle: {
    backgroundColor: theme.dark,
  },
  headerTintColor: theme.white,
  tabBarStyle: {
    height: 50,
  },
  tabBarLabelStyle: {
    fontSize: 18,
    marginBottom: 14,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Conversion"
          component={ConversionScreen}
          options={{
            headerTitle: 'Currency Converter',
            ...commonTabStyles,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            headerTitle: 'Conversion History',
            ...commonTabStyles,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
