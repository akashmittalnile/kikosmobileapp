import {createDrawerNavigator} from '@react-navigation/drawer';
import Notification from '../../screens/Notification/Notification';
import BottomTab from '../BottomTab/BottomTab';
import CustomDrawer from './CustomDrawer';
import WebViewPage from '../../screens/WebViewPage/WebViewPage';
import {useNetworkError} from '../../hooks/useNetworkError';
import {ScreenNames} from '../../global';
import NoConnection from '../../screens/NoConnection/NoConnection';
import MainStack from '../MainStack/MainStack';
import ContactUs from '../../screens/ContactUs/ContactUs';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  // variables
  // useNetworkError();
  const initialRouteName = ScreenNames.BOTTOM_TAB;

  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName}
      headerMode={null}
      screenOptions={{headerShown: false, drawerWidth: '100%'}}
      drawerWidth={'100%'}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={ScreenNames.BOTTOM_TAB}
        options={{headerShown: false}}
        component={BottomTab}
      />
      <Drawer.Screen
        name="Notification"
        options={{headerShown: false}}
        component={Notification}
      />
      <Drawer.Screen
        name="WebViewPage"
        options={{headerShown: false}}
        component={WebViewPage}
      />
      <Drawer.Screen
        name="ContactUs"
        options={{headerShown: false}}
        component={ContactUs}
      />
      {/* <Drawer.Screen
        name={ScreenNames.NO_CONNECTION}
        options={{headerShown: false}}
        component={NoConnection}
      /> */}
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
