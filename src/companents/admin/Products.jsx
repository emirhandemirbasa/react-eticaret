import React, { useEffect } from 'react'
import '../../css/admin/AdminTable.css';
import '../../css/buttons.css';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../redux/slices/bookSlice';



function Products() {
  const { books } = useSelector((store) => store.book);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [])
  return (
    <div className="admin-table-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="admin-table-title">Ürünler</div>
        <Link to={"/admin/urunekle"}><button className="btn btn-green"><FaPlus />Kitap Ekle</button></Link>
      </div>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead className="admin-thead">
            <tr>
              <th>#</th>
              <th>Kitap Adı</th>
              <th>Yazar Adı</th>
              <th>Kapak Fotoğrafı</th>
              <th>Seçenekler</th>
            </tr>
          </thead>
          <tbody className="admin-tbody">
            {
              books.map((book) => (
                <tr>
                  <td>{book.id}</td>
                  <td>{book.book_name}</td>
                  <td>{book.writer_name}</td>
                  <td><div className="badge show-book"><FaEye /><p>Kapağı Göster</p></div></td>
                  <td><button className="btn btn-blue"><MdModeEdit className='chose' /></button> <button className="btn btn-red"><MdDelete className='chose' /></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Products