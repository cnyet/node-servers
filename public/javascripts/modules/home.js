function addHandle () {
  $('form')[0].reset();
  $('#message-id').val('');
}

// 保存数据
function clickHandle() {
  const formData = $('form').serializeArray();
  const data = {
    id: Math.random().toString(16).substr(2, 7)
  };
  formData.forEach(item => {
    data[item.name] = item.value;
  });
  if (data.status) {
    // 修改数据
    fetch('/update', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      $('#exampleModal').modal('hide');
      location.reload();
    }).catch(err => {
      console.error(err);
    })
  } else {
    // 添加数据
    fetch('/add', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      $('#exampleModal').modal('hide');
      location.reload();
    }).catch(err => {
      console.error(err);
    })
  }
}

// 修改数据
function updateHandle (record) {
  $('#exampleModal').modal('show');
  if (record) {
    $('#recipient-name').val(record.name);
    $('#message-text').val(record.remark);
    $('#message-id').val(record.id);
  }
}

// 删除数据
function deleteHandle (id) {
  fetch('/delete', {
    method: 'delete',
    body: JSON.stringify({
      id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    location.reload();
  }).catch(err => {
    console.error(err);
  })
}