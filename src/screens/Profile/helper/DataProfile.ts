import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default [
  { 
    title: 'Dados básicos',
    icon: 'file-document-multiple',
    vectorIcon: MaterialCommunityIcons,
    route: 'EditProfile',
    key: 'BASIC',
  },
  { 
    title: 'Contato',
    icon: 'person',
    vectorIcon: MaterialIcons,
    route: 'EditProfile',
    key: 'CONTACT',
  },
  { 
    title: 'Endereço',
    icon: 'location-on',
    vectorIcon: MaterialIcons,
    route: 'EditProfile',
    key: 'ADDRESS',
  },

  { 
    title: 'Igreja',
    icon: 'church',
    vectorIcon: MaterialIcons,
    route: 'EditProfile',
    key: 'CHURCH',
  },
]