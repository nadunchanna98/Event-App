import React, { useState ,useContext  } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from './CustomInput'
import * as ImagePicker from "react-native-image-picker"
import DateTimePicker from '@react-native-community/datetimepicker';
import BASE_URL from '../../Common/BaseURL'
import axios from 'axios';
import { NewContext } from '../../Common/Context';

const NewEvent = () => {

  const { pullMe } = useContext(NewContext);

  const handleSubmit = (values  ) => {

    const formData = {
      event: values.event,
      date: "2027-12-12 19:10:00",
      description: values.description,
      type: values.type,
      gender: values.gender,

    }

    axios.post(`${BASE_URL}futureevents/post`, formData)
    .then(data => {
        console.log(" success ")
        pullMe();
      }
      )
      .catch(err => console.log(err))
  }

  // const [mydate, setDate] = useState(new Date());
  // const [displaymode, setMode] = useState('date');
  // const [isDisplayDate, setShow] = useState(false);
  // const changeSelectedDate = (event, selectedDate) => {
  //   const currentDate = selectedDate || mydate;
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);

  // };

  // const displayDatepicker = () => {
  //   showMode('date');
  // };

  const signUpValidationSchema = yup.object().shape({
    event: yup
      .string()
      // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Event Name is required'),
    location: yup
      .string(),
    gender: yup
      .string(),
    description: yup
      .string()
      .min(0, ({ min, value }) => `${min - value.length} characters to go`),
    // photo: yup.object().required('Photo is required'),
  })


  return (
    <>

      <View style={styles.container}>
        <View style={styles.signupContainer}>

          <Formik
            initialValues={{
              event: '',
              location: '',
              gender: '',
              type: '',
              date: '',
              description: '',
              setFieldValue: '',
              setFieldTouched: '',
              errors: '',
              touched: '',
            }}
            onSubmit={values => handleSubmit(values)}
            validationSchema={signUpValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Text style={styles.lable}  >Event Name</Text>
                <Field
                  component={CustomInput}
                  name="event"
                  placeholder="Football"
                />
                <Text style={styles.lable}  >Type</Text>
                <Field
                  component={CustomInput}
                  name="type"
                  placeholder="Team/Individual"
                />

                <Text style={styles.lable}  >Gender</Text>
                <Field
                  component={CustomInput}
                  name="gender"
                  placeholder="Men"
                />
                <Text style={styles.lable}  >Location</Text>
                <Field
                  component={CustomInput}
                  name="location"
                  placeholder="At the Main Stadium"
                  keyboardType="email-address"
                />

                <Text style={styles.lable}  >Description</Text>
                <Field
                  component={CustomInput}
                  name="description"
                  placeholder="Write about Event.."
                  multiline
                  numberOfLines={3}
                />

                <Text style={styles.lable}  >Date</Text>
                <Field
                  component={CustomInput}
                  name="date"
                  placeholder="12/12/2027"
                />

                {/* <View>
                  <Button onPress={displayDatepicker} title="Show date picker!" />
                </View>
                {isDisplayDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={mydate}
                    mode={displaymode}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                  />
                )} */}

                {/* <TouchableOpacity
                  style={styles.photoButton}
                  onPress={() => {
                    ImagePicker.showImagePicker(options, (response) => {
                      if (response.uri) {
                        let data = {
                          name: response.fileName,
                          type: response.type,
                          uri:
                            Platform.OS === 'android'
                            ? response.uri
                            : response.uri.replace('file://', ''),
                        };
                        formProps.setFieldValue('image1', data);
                      }
                    });
                  }}
                >
                  <Text>Add Image</Text>
                </TouchableOpacity> */}


                <Button
                  onPress={handleSubmit}
                  title="Add Event"
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>

        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#4682B4'

  },
  photoButton: {
    backgroundColor: '#04b040',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    shadowColor: '#E67E22',
    shadowOpacity: 0.8,
    elevation: 8

  }
})
export default NewEvent