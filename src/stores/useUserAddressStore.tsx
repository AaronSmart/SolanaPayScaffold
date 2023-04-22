import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface UserAddressStore extends State {
  address: string;
  getUserAddress: (addressStr: string) => void
}

const useUserAddressStore = create<UserAddressStore>((set, _get) => ({
  address: "",
  getUserAddress: async (addressStr) => {
    let address = addressStr;
    set((s) => {
      s.address = address;
      console.log(`address, `, address);
    })
  },
}));

export default useUserAddressStore;