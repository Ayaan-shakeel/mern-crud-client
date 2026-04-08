import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function EnquiryList({ data,getAllEnquiry,Swal,setFormData }) {
  let deleteRow=(delid)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    axios.delete(`https://mern-crud-server-a19z.onrender.com/api/website/enquiry/delete/${delid}`)
    .then((res)=>{
      toast.success("Enquiry Deleted Successfully")
      getAllEnquiry()
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  });
}
      
    })

  }
 let editRow=(edid)=>{
  axios.get(`https://mern-crud-server-a19z.onrender.com/api/website/enquiry/singleRow/${edid}`)
  .then((res)=>{
    let data=res.data
    setFormData(data.enquiry)
  })

 }


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
  <h2 className="mb-6 text-center text-xl font-bold text-slate-800 sm:text-2xl">
    Enquiry List
  </h2>

  <div className="overflow-x-auto rounded-xl border border-slate-200">
    <Table hoverable className="min-w-[900px] text-sm text-slate-700">
      <TableHead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-700">
        <TableRow>
          <TableHeadCell className="whitespace-nowrap">S.No</TableHeadCell>
          <TableHeadCell className="whitespace-nowrap">NAME</TableHeadCell>
          <TableHeadCell className="whitespace-nowrap">EMAIL</TableHeadCell>
          <TableHeadCell className="whitespace-nowrap">PHONE NO</TableHeadCell>
          <TableHeadCell className="whitespace-nowrap">MESSAGE</TableHeadCell>
          <TableHeadCell className="whitespace-nowrap text-center">Delete</TableHeadCell>
          <TableHeadCell className="whitespace-nowrap text-center">Edit</TableHeadCell>
        </TableRow>
      </TableHead>

      <TableBody className="divide-y">
        {data.length >= 1 ? (
          data.map((item, index) => {
            return (
              <TableRow
                key={index}
                className="bg-white transition hover:bg-slate-50"
              >
                <TableCell className="font-medium text-slate-800">
                  {index + 1}
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-slate-800">
                  {item.name}
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.email}</TableCell>
                <TableCell className="whitespace-nowrap">{item.phone}</TableCell>
                <TableCell className="min-w-[220px] max-w-[320px] whitespace-normal break-words text-slate-600">
                  {item.message}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => {
                      deleteRow(item._id);
                    }}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => {
                      editRow(item._id);
                    }}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow className="bg-white">
            <TableCell colSpan={7} className="py-6 text-center text-slate-500">
              No Data Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
</div>
  )
}



