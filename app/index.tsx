import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FirstScreen } from "./components/screens/FirstScreen";
import { Login } from "./components/screens/Connexion";
import { Register } from "./components/screens/Register";
import { ForgotPassword } from "./components/screens/ForgotPassword";
import { BottomTab } from "./components/widgets/BottomTab";
import { PaymentDetail } from "./components/screens/PaymentDetail";
import { PaymentMode } from "./components/screens/PaymentMode";
import { PaymentForm } from "./components/screens/PaymentForm";
import { PaymentSuccess } from "./components/screens/PaymentSuccess";
import { Profile } from "./components/screens/Profile";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{ headerShown: false }}>
      {/* ── Authentification ── */}
      <Stack.Screen name="FirstScreen"     component={FirstScreen} />
      <Stack.Screen name="Login"           component={Login} />
      <Stack.Screen name="Register"        component={Register} />
      <Stack.Screen name="ForgotPassword"  component={ForgotPassword} />

      {/* ── App principale ── */}
      <Stack.Screen name="Home"            component={BottomTab} />
      <Stack.Screen name="Profile"         component={Profile} />

      {/* ── Flow paiement ── */}
      <Stack.Screen name="PaymentDetail"   component={PaymentDetail} />
      <Stack.Screen name="PaymentMode"     component={PaymentMode} />
      <Stack.Screen name="PaymentForm"     component={PaymentForm} />
      <Stack.Screen name="PaymentSuccess"  component={PaymentSuccess} />
    </Stack.Navigator>
  );
}