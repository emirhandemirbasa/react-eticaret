import React from 'react'
import '../../css/admin/AdminTable.css';
function Orders() {
    return (
        <div className='admin-table-section'>
            <div className="admin-table-title">
                Siparişler
            </div>
            <div className="admin-table-wrapper">
                <table className='admin-table'>
                    <thead className='admin-thead'>
                        <tr>
                            <th>#</th>
                            <th>Ad Soyad</th>
                            <th>Ürünler</th>
                            <th>Toplam Tutar</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>
                    <tbody className='admin-tbody'>
                        <td>1</td>
                        <td>Emirhan Demirbaşa</td>
                        <td>Tutunamayanlar</td>
                        <td>1500 TL</td>
                        <td>İncele</td>
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Orders