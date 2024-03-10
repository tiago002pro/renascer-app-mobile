import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default [
  { 
    title: 'Dados básicos',
    icon: 'file-document-edit-outline',
    vectorIcon: MaterialCommunityIcons,
    route: 'EditProfile',
    key: 'BASIC',
  },
  { 
    title: 'Contato',
    icon: 'person-circle-outline',
    vectorIcon: Ionicons,
    route: 'EditProfile',
    key: 'CONTACT',
  },
  { 
    title: 'Endereço',
    icon: 'location-outline',
    vectorIcon: Ionicons,
    route: 'EditProfile',
    key: 'ADDRESS',
  },

  { 
    title: 'Igreja',
    icon: 'church',
    vectorIcon: MaterialCommunityIcons,
    route: 'EditProfile',
    key: 'CHURCH',
  },
]