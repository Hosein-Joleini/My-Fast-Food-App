import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserStateType } from '../../../types/global';
import { getAddress } from '../../services/apiGeocoding';

const initialState = {
  address: '',
  position: {},
  status: 'idle',
  error:
    'There was a problem getting your address. Make sure to fill this field!',
} as UserStateType;

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      throw new Error('Geolocation is not supported');
    }
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  const positionData = await getPosition();
  const position = {
    latitude: positionData.coords.latitude,
    longitude: positionData.coords.longitude,
  };

  const addressData = await getAddress(position);

  const address = `${addressData?.locality}, ${addressData?.city} ${addressData?.postcode}, ${addressData?.countryName}`;

  return { address, position };
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.status = 'idle';
    });
    builder.addCase(fetchAddress.rejected, (state) => {
      state.status = 'error';
    });
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = 'loading';
    });
  },
});

export default userSlice.reducer;
