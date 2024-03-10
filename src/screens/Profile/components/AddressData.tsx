import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Box, Button } from "native-base";
import { Masks } from "react-native-mask-input";
import { ActivityIndicator } from "react-native-paper";

import AddressService from "../service/AddressService";

import InputTextComponent from "../../../components/InputText";

import { THEME } from "../../../styles/theme";
const { width } = Dimensions.get('screen');

interface AddressDataProps {
  address?:any;
  setAddress?:any;
  scrollTo?:() => void;
}

export function AddressData({ address, setAddress, scrollTo }:AddressDataProps) {
  const [showDataAddress, setShowDataAddress] = useState(true);
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
    <View style={[styles.container, { width }]}>
      <View>
        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'País'}
            valiable={address?.country}
            setValiable={setCountry}
          />
        </Box>

        <Box style={styles.inputArea}>
          <InputTextComponent
            label={'CEP'}
            valiable={address?.zipCode}
            setValiable={setZipCode}
            mask={Masks.ZIP_CODE}
            type={'numeric'}
          />
        </Box>

        {loading ?
          <Box mt={20}>
            <ActivityIndicator size={"large"} color={THEME.colors.yellow[500]} />
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
              />
            </Box>

            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Box style={styles.inputArea} w={'48%'}>
                <InputTextComponent
                  label={'Nº'}
                  valiable={address?.number}
                  setValiable={setNumber}
                />
              </Box>

              <Box style={styles.inputArea} w={'48%'}>
                <InputTextComponent
                  label={'Complemento'}
                  valiable={address?.complement}
                  setValiable={setComplement}
                />
              </Box>
            </Box>

            <Box style={styles.inputArea}>
              <InputTextComponent
                label={'Bairro'}
                valiable={address?.neighborhood}
                setValiable={setNeighborhood}
              />
            </Box>

            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Box style={styles.inputArea} w={'48%'}>
                <InputTextComponent
                  label={'Cidade'}
                  valiable={address?.city}
                  setValiable={setCity}
                />
              </Box>

              <Box style={styles.inputArea} w={'48%'}>
                <InputTextComponent
                  label={'UF'}
                  valiable={address?.state}
                  setValiable={setState}
                />
              </Box>
            </Box>
          </View>
          : null
        }
      </View>
      <View style={styles.footer}>
        <Button
          onPress={scrollTo}
          backgroundColor={THEME.colors.gray[500]}
          _text={{ color: THEME.colors.white, fontWeight: 'bold' }}
        >
          Próximo
        </Button>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: THEME.sizes.paddingPage,
    paddingRight: THEME.sizes.paddingPage,
  },
  areaName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputArea: {
    marginBottom: 10,
  },
  label: {
    color: THEME.colors.white,
    fontSize: THEME.fontSizes.sm,
    marginBottom: 2,
  },
  footer: {
    marginBottom: THEME.sizes.paddingPage * 5,
  },
})