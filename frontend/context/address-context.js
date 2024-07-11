import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import axios from 'axios'
// api path
import {
  CHECKOUT_GET_ADDRESS,
  CHECKOUT_DELETE_ADDRESS,
  CHECKOUT_ADD_ADDRESS,
} from '@/configs/api-path'

const AddressContext = createContext()

export const useAddress = () => {
  return useContext(AddressContext)
}

export const AddressProvider = ({ children }) => {
  const { auth } = useAuth()
  const [isAddressSelectModalOpen, setIsSelectModalOpen] = useState(false) // 控制「請選擇收件人」開關
  const [isAddressAddModalOpen, setIsAddressAddModalOpen] = useState(false) // 控制「請選擇收件人」開關
  const [memberAddress, setMemberAddress] = useState([]) // 取得會員 address table 所有地址
  const [orderAddress, setOrderAddress] = useState(null)
  const [newAddressId, setNewAddressId] = useState(0)

  // 取得會員地址
  const fetchMemberAddress = async () => {
    try {
      const response = await axios.get(
        `${CHECKOUT_GET_ADDRESS}?member_id=${auth.id}`
      )

      if (!response.status) {
        throw new Error('Failed to fetch member address')
      }

      const data = response.data

      setMemberAddress(data.rows)

      if (!orderAddress) {
        const newOrderAddress =
          data.rows.find((v) => v.type === '1') ||
          data.rows[0]

        setOrderAddress(newOrderAddress)
      }
    } catch (error) {
      console.log('Error fetching member address:', error)
    }
  }

  // 開啟「選擇收件人」視窗
  const openAddressSelectModal = () => {
    fetchMemberAddress()
    setIsSelectModalOpen(true)
  }

  // 關閉「選擇收件人」視窗
  const closeAddressSelectModal = () => {
    setIsSelectModalOpen(false)
  }

  // 開啟「新增收件人」視窗
  const openAddressAddModal = () => {
    setIsAddressAddModalOpen(true)
  }

  // 關閉「新增收件人」視窗
  const closeAddressAddModal = () => {
    setIsAddressAddModalOpen(false)
  }

  // 刪除會員地址
  const handleAddressDelete = async (addressId) => {
    try {
      const response = await fetch(`${CHECKOUT_DELETE_ADDRESS}/${addressId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      if (data.success) {
        fetchMemberAddress() // 成功刪除後，更新前端會員地址資料
        if (addressId === orderAddress.id ) {
          setOrderAddress(null)
        }
        console.log(`delete address is: ${addressId}`)
      } else {
        console.error('地址刪除失敗', data)
      }
    } catch (error) {
      console.error('刪除地址時出錯', error)
    }
  }

  // 使用會員地址
  const handleSelectAddress = (addressId) => {
    setNewAddressId(addressId)
    closeAddressSelectModal()
  }

  const handleAddAddressSubmit = async (addAddressData) => {
    try {
      const response = await axios.post(CHECKOUT_ADD_ADDRESS, addAddressData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(response.data)

      if (response.data.success && !!response.data.addressId) {
        fetchMemberAddress()
        setNewAddressId(response.data.addressId)
        closeAddressAddModal()
        closeAddressSelectModal()
      } else {
        alert('新增失敗！')
      }

      console.log('new added id', response.data.addressId)
    } catch (error) {
      console.error('新增地址錯誤', error)
    }
  }

  useEffect(() => {
    if (!!memberAddress){
      const newOrderAddress = memberAddress.find((v) => v.id === newAddressId)
      if (newOrderAddress) {
        setOrderAddress(newOrderAddress)
      }
    }
  }, [memberAddress, newAddressId])


  return (
    <AddressContext.Provider
      value={{
        // 視窗開關
        isAddressSelectModalOpen,
        openAddressSelectModal,
        closeAddressSelectModal,
        isAddressAddModalOpen,
        openAddressAddModal,
        closeAddressAddModal,
        newAddressId, // 要設為訂單使用地址的 id
        setNewAddressId,
        setOrderAddress, // 設定訂單使用地址
        fetchMemberAddress, // 取得會員所有資料庫 address table 資料
        memberAddress, // 會員所有資料庫 address table 資料
        orderAddress, // 本次訂單使用的地址
        handleAddressDelete, // 刪除指定地址
        handleSelectAddress, // 使用指定地址
        handleAddAddressSubmit,
      }}
    >
      {children}
    </AddressContext.Provider>
  )
}

// 設定使用的地址
// const handleSelectAddress = (addressId) => {
//   const updatedSelectedAddresses = memberAddress.map((v) => ({
//     ...v,
//     selected: v.id === addressId, // 選中的 addressId = true, 其餘為 false
//   }))
//   setSelectedAddress(updatedSelectedAddresses)
// }

// 更新已經選擇的地址
// const handleAddressSelected = (addressId) => {
//   setMemberAddress(addressId)
//   setSelectedAddress(addressId)
// }

// 重新加載成員地址列表
// const handleUpdateAddresses = () => {
//   fetchMemberAddress()
// }
