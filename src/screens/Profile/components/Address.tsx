import { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, View } from "native-base";
import { Masks } from "react-native-mask-input";
import { ActivityIndicator } from "react-native-paper";
import AddressService from "../service/AddressService";
import InputTextComponent from "../../../components/InputText";
import { THEME } from "../../../styles/theme";

interface AddressProps {
  address?:any;
  setAddress?:any;
  errors?:any;
}

export function Address({ address, setAddress, errors }:AddressProps) {
  const [showDataAddress, setShowDataAddress] = useState(address?.zipCode ? true : false);
  const [loading, setLoading] = useState(false);

  function setCountry(country:any) { setAddress({...address, country: country}) }
  async function setZipCode(zipCode:any) {
    await validateZipCode(zipCode)
    setAddress({...address, zipCode: zipCode})
  }
  function setPublicPlace(publicPlace:any) { setAddress({...address, publicPlace: publicPlace}) }
  function setNumber(number:any) { setAddress({...address, number: number}) }
  function setComplement(complement:any) { setAddress({...address, complement: complement}) }
  function setNeighborhood(neighborhood:any) { setAddress({...address, neighborhood: neighborhood}) }
  function setCity(city:any) { setAddress({...address, city: city}) }
  function setState(state:any) { setAddress({...address, state: state}) }

  async function validateZipCode(zipCode:string) {
    if (zipCode) {
      const replaceZipCode = zipCode.replace(/-/, '')
      if (replaceZipCode && replaceZipCode.length == 8) {
        await getAddress(replaceZipCode)
      } else {
        setShowDataAddress(false)
        address.publicPlace = null
        address.number = null
        address.complement = null
        address.neighborhood = null
        address.city = null
        address.state = null

        setPublicPlace(null)
        setNumber(null)
        setComplement(null)
        setNeighborhood(null)
        setCity(null)
        setState(null)
      }
    }
  }

  async function getAddress(replaceZipCode:string) {
    setLoading(true)
    const addressData = await AddressService.getAddressByCep(replaceZipCode)
    address.publicPlace = addressData.logradouro
    address.number = null
    address.complement = null
    address.neighborhood = addressData.bairro
    address.city = addressData.localidade
    address.state = addressData.uf

    setPublicPlace(addressData.logradouro)
    setNumber(null)
    setComplement(null)
    setNeighborhood(addressData.bairro)
    setCity(addressData.localidade)
    setState(addressData.uf)
    setShowDataAddress(true)
    setLoading(false)
  }

  return (
    <Box flex={1}>
      <Box style={styles.inputArea}>
        <InputTextComponent
          label={'País'}
          valiable={address?.country}
          setValiable={setCountry}
          error={errors?.country}
        />
      </Box>

      <Box style={styles.inputArea}>
        <InputTextComponent
          label={'CEP'}
          valiable={address?.zipCode}
          setValiable={setZipCode}
          mask={Masks.ZIP_CODE}
          type={'numeric'}
          error={errors?.zipCode}
        />
      </Box>

      {loading ?
        <Box mt={20}>
          <ActivityIndicator size={"large"} color={THEME.colors.primary} />
        </Box>
        : null 
      }   

      {showDataAddress ? 
        <View>
          <Box style={styles.inputArea}>
            <InputTextComponent
              label={'Endereço'}
              valiable={address?.publicPlace}
              setValiable={setPublicPlace}
              error={errors?.publicPlace}
            />
          </Box>

          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Box style={styles.inputArea} w={'48%'}>
              <InputTextComponent
                label={'Nº'}
                valiable={address?.number}
                setValiable={setNumber}
                error={errors?.number}
              />
            </Box>

            <Box style={styles.inputArea} w={'48%'}>
              <InputTextComponent
                label={'Complemento'}
                valiable={address?.complement}
                setValiable={setComplement}
                error={false}
              />
            </Box>
          </Box>

          <Box style={styles.inputArea}>
            <InputTextComponent
              label={'Bairro'}
              valiable={address?.neighborhood}
              setValiable={setNeighborhood}
              error={errors?.neighborhood}
            />
          </Box>

          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Box style={styles.inputArea} w={'48%'}>
              <InputTextComponent
                label={'Cidade'}
                valiable={address?.city}
                setValiable={setCity}
                error={errors?.city}
              />
            </Box>

            <Box style={styles.inputArea} w={'48%'}>
              <InputTextComponent
                label={'UF'}
                valiable={address?.state}
                setValiable={setState}
                error={errors?.state}
              />
            </Box>
          </Box>
        </View>
        : null
      }
    </Box>
  );
}

export const styles = StyleSheet.create({
  inputArea: {
    marginBottom: 20,
  },
})