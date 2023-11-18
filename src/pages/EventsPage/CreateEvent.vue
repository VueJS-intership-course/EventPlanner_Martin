<template>
  <div class="container py-4 d-flex flex-column">
    <div class="card shadow align-self-center rounded-3 col-lg-8">
      <div class="card-header p-3 h4 bg-primary text-white">Create Event</div>
      <div
        class="card-body d-flex justify-content-center align-self-center w-100"
      >
        <Form
          @submit="handleCreateEvent"
          :validationSchema="schema"
          role="form"
          class="d-flex flex-column column w-100"
        >
          <div class="d-flex">
            <div class="form-group w-100 mb-2 me-5">
              <label class="form-control-label" for="name"
                >Name<span style="color: red">*</span></label
              >
              <Field
                type="text"
                class="form-control"
                id="form-group-input"
                name="name"
                ref="eventName"
                placeholder="Type name..."
              />
              <ErrorMessage name="name" class="text-danger" />
            </div>
            <div class="form-group w-100 mb-2 ms-5">
              <label class="form-control-label" for="description"
                >Description<span style="color: red">*</span></label
              >
              <Field
                type="text"
                class="form-control"
                id="form-group-input"
                name="description"
                placeholder="Type description..."
              />
              <ErrorMessage name="description" class="text-danger" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-100 mb-2 me-5">
              <label class="form-control-label" for="tickets"
                >Tickets<span style="color: red">*</span></label
              >
              <Field
                type="number"
                class="form-control"
                id="form-group-input"
                name="tickets"
                placeholder="Type count of tickets..."
              />
              <ErrorMessage name="tickets" class="text-danger" />
            </div>
            <div class="form-group w-100 mb-2 ms-5">
              <label class="form-control-label" for="price"
                >Price<span style="color: red">*</span></label
              >
              <Field
                type="number"
                class="form-control"
                id="form-group-input"
                name="price"
                placeholder="Type price..."
              />
              <ErrorMessage name="price" class="text-danger" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-100 mb-2 me-5">
              <label class="form-control-label" for="date"
                >Date<span style="color: red">*</span></label
              >
              <Field
                type="date"
                class="form-control"
                id="form-group-input"
                name="date"
              />
              <ErrorMessage name="date" class="text-danger" />
            </div>
            <div class="form-group w-100 mb-2 ms-5">
              <label class="form-control-label" for="time"
                >Time<span style="color: red">*</span></label
              >
              <Field
                type="time"
                class="form-control"
                id="form-group-input"
                name="time"
              />
              <ErrorMessage name="time" class="text-danger" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group w-50 mb-2 me-5">
              <label class="form-control-label" for="budget"
                >Budget<span style="color: red">*</span></label
              >
              <Field
                type="number"
                class="form-control"
                id="form-group-input"
                name="budget"
                placeholder="Type budget..."
              />
              <ErrorMessage name="budget" class="text-danger" />
            </div>
            <!-- <div class="form-group w-50 mb-2 ms-5">
              <label class="form-control-label" for="imageUrl"
                >Image URL<span style="color: red">*</span></label
              >
              <Field
                type="text"
                class="form-control"
                id="form-group-input"
                name="imageUrl"
                placeholder="Type image url..."
              />
              <ErrorMessage name="imageUrl" class="text-danger" />
            </div> -->
            <div class="form-group w-50 mb-2 ms-5">
              <label class="form-control-label" for="imageFile">
                Upload Image<span style="color: red">*</span>
              </label>
              <input
                type="file"
                class="form-control"
                id="imageFile"
                ref="imageFile"
                @change="handleFileUpload"
              />
              <ErrorMessage name="imageFile" class="text-danger" />
            </div>
          </div>
          <div class="d-flex flex-column align-self-center w-100">
            <label class="form-control-label" for="location"
              >Choose location<span style="color: red">*</span></label
            >
            <p v-if="errorMsg" class="text-danger">{{ errorMsg }}</p>
            <MapComponent
              class="mt-2"
              style="height: 450px; width: 830px"
              @selectedLocation="handleCoordinates"
            ></MapComponent>
          </div>
          <div class="form-group align-self-center mt-2">
            <button
              type="submit"
              class="btn btn-primary float-end mt-2"
              for="form-group-input"
            >
              Create Event
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { eventStore } from '@/store/eventStore.js';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MapComponent from '@/common-templates/MapComponent.vue';
import { getAddressFromCoordinates } from '../../utils/getAddressFromCoordinates';
import { getTimeZone } from '../../utils/getTimeZone';
import moment from 'moment-timezone';
import firebaseData from '../../services/firebaseConfig.js';

const router = useRouter();

const firebaseStorage = firebaseData.fireStorage.ref();

const schema = yup.object({
  name: yup.string().required('This field is required!'),
  description: yup.string().required('This field is required!'),
  tickets: yup.number().required('This field is required!'),
  price: yup.number().required('This field is required!'),
  budget: yup.number().required('This field is required!'),
  date: yup.string().required('This field is required!'),
  time: yup.string().required('This field is required!'),
});

const store = eventStore();

const errorMsg = ref('');

const selectedCoordinates = ref(null);
const address = ref(null);
const timeZone = ref(null);
const time = ref(null);
const imageUrl = ref(null);
const eventName= ref('');

const handleCoordinates = async (coordinates) => {
  selectedCoordinates.value = coordinates;
};

const handleFileUpload = async (event) => {
  const imageFile = event.target.files[0];
  const storageRef = firebaseStorage.child(`images/${imageFile.name}`);
  try {
    const snapshot = await storageRef.put(imageFile);
    imageUrl.value = await snapshot.ref.getDownloadURL();
    console.log('Successfully upload!');
  } catch (error) {
    console.log(error);
  }
};

const handleCreateEvent = async (values) => {
  if (!selectedCoordinates.value) {
    errorMsg.value = 'Please select a location on the map.';
    return;
  }

  address.value = await getAddressFromCoordinates(selectedCoordinates.value);
  timeZone.value = getTimeZone(selectedCoordinates.value);
  const eventDateAndTime = `${values.date}T${values.time}`;
  time.value = moment.tz(eventDateAndTime, timeZone.value).utc().toISOString();

  console.log(time.value);

  try {
    const newEvent = {
      name: values.name,
      description: values.description,
      ticket: values.tickets,
      price: values.price,
      budget: values.budget,
      time: time.value,
      location: selectedCoordinates.value,
      address: address.value,
      timeZone: timeZone.value,
      imageUrl: imageUrl.value,
      clients: [],
      profit: 0,
      expenses: 0,
    };

    store.createEvent(newEvent);
    router.push({ name: 'events' });
  } catch (error) {
    errorMsg.value = error.message;
  }
};
</script>

<style scoped lang="scss">
.back-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(77, 77, 77, 0.452);
  z-index: 3;

  .add-modal {
    position: absolute;
    top: 20%;
    left: 10%;
  }
}
</style>
