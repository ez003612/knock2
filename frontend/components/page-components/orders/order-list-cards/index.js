import React from 'react'
import styles from './order-list-cards.module.css'
import { FiShoppingBag, FiCreditCard, FiPackage } from 'react-icons/fi'
import FilterBtn from '@/components/UI/filter-btn'

export default function OrderListCards() {
  return (
    <div className={styles.orderBox}>
      <div className={styles.orderHeader}>
        <p>2024.05.22</p>
        <FilterBtn btnText="詳情" href='/user/orders/details'/>
      </div>
      <div className="horizontalDivider" />
      <div className={styles.orderContent}>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoRow}>
            <FiShoppingBag />
            <p>202405220001</p>
          </div>
          <div className={styles.orderInfoRow}>
            <FiCreditCard />
            <p>$ 32,000 / 信用卡</p>
          </div>
          <div className={styles.orderInfoRow}>
            <FiPackage />
            <p>台北市大安區天堂路38號</p>
          </div>
          <div
            className={`${styles.orderStatusTag} ${styles.orderStatusOrange}`}
          >
            待出貨
          </div>
        </div>
        <div className={styles.orderProductImg}>
          <div className="itemImgBox">
            <img src="/products/p1.png" alt="" />
          </div>
          <div className="itemImgBox">
            <img src="/products/p1.png" alt="" />
          </div>
          <div className="itemImgBox">
            <img src="/products/p1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
