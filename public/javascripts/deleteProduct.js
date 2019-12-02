$(document).ready(() => {
   $('.delete-product').on('click',function(event)  {
      const kq = confirm('Are you sure you want to delete this item?')
      if(!kq) return
      let pid = $(this).data("pid")
      $.ajax({
         type: `DELETE`,
         url: `/product/ ${pid}`,
         headers: {
            token: localStorage.getItem("token")
         },
         success: (response) => {
            if (response.status === true) {
               $("table").find(`tr[data-pid='_${pid}']`).remove();
            }
         },
         error: (err) => {
            alert(err.responseJSON.message);
         }
      })
   })
})
