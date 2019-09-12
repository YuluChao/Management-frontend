import Mock from 'mockjs'

Mock.mock('/web/club/login/', 'post', () => {
  const login = {
    'status': 200,
    'data': {
      'clubInfo': {
        'name': 'Link Club',
        'summary': 'It is a interestring Internet club',
        'introduction': 'Join us!',
        'locale': ['UPC'],
        'type': 'Technology',
        'image': '',
        'logo': '',
        'tag': 'Hot',
        'email': 'chaoyulu0501@163.com',
        'apply_url': 'http://yuluchao.github.io',
        'show_type': 'native',
        'url': 'http://yuluchao.github.io'
      }
    }
  }
  return login
})

Mock.mock('/web/club/logout/', 'get', () => {
  const logout = {
    'status': 200,
    'data': {
    }
  }
  return logout
})

Mock.mock('/web/club/basic/', 'get', () => {
  const basicGet = {
    'status': 200,
    'data': {
      'clubInfo': {
        'name': 'Link Club',
        'summary': 'It is a interestring Internet club',
        'introduction': 'Join us!',
        'locale': ['UPC'],
        'type': 'Technology',
        'image': '',
        'logo': '',
        'tag': 'Hot',
        'email': 'yuluchao0501@163.com',
        'apply_url': 'http://yuluchao.github.io',
        'show_type': 'native',
        'url': 'http://yuluchao.github.io'
      }
    }
  }
  return basicGet
})

Mock.mock('/web/club/basic/', 'put', () => {
  const basicPut = {
    'status': 200,
    'data': {
    }
  }
  return basicPut
})

Mock.mock('/web/club/dept/', 'get', () => {
  const deptGet = {
    'status': 200,
    'message': 'Success',
    'data': {
      'depts': [
        {
          'dept_id': '1',
          'name': 'iOS',
          'image': '',
          'introduction': 'Join us!'
        },
        {
          'dept_id': '2',
          'name': 'Web',
          'image': '',
          'introduction': 'Join us!'
        },
        {
          'dept_id': '3',
          'name': 'Android',
          'image': '',
          'introduction': 'Join us!'
        }
      ]
    }
  }
  return deptGet
})

Mock.mock('/web/club/dept/', 'post', () => {
  const deptPost = {
    'status': 200,
    'data': {
      'dept_id': '10'
    }
  }
  return deptPost
})

Mock.mock('/web/club/dept/', 'put', () => {
  const deptPut = {
    'status': 200,
    'data': {
    }
  }
  return deptPut
})

Mock.mock('/web/club/dept/order/', 'put', () => {
  const deptOrder = {
    'status': 200,
    'data': {
    }
  }
  return deptOrder
})

Mock.mock('/web/club/dept/', 'delete', () => {
  const deptDelete = {
    'status': 200,
    'data': {
    }
  }
  return deptDelete
})

Mock.mock('/web/club/activity/', 'get', () => {
  const activityGet = {
    'status': 200,
    'data': {
      'activities': [
        {
          'activity_id': '1',
          'name': 'Taco Day',
          'image': '',
          'tag': 'Hot',
          'introduction': 'Interestring'
        },
        {
          'activity_id': '2',
          'name': 'Movie Day',
          'image': '',
          'tag': 'Hot',
          'introduction': 'Interestring'
        }
      ]
    }
  }
  return activityGet
})

Mock.mock('/web/club/activity/', 'post', () => {
  const activityPost = {
    'status': 200,
    'data': {
      'activity_id': '12'
    }
  }
  return activityPost
})

Mock.mock('/web/club/activity/', 'put', () => {
  const activityPut = {
    'status': 200,
    'data': {
    }
  }
  return activityPut
})

Mock.mock('/web/club/activity/order/', 'put', () => {
  const activityOrder = {
    'status': 200,
    'data': {
    }
  }
  return activityOrder
})

Mock.mock('/web/club/activity/', 'delete', () => {
  const activityDelete = {
    'status': 200,
    'data': {
    }
  }
  return activityDelete
})

Mock.mock('/web/club/contact/', 'get', () => {
  const contactGet = {
    'status': 200,
    'data': {
      'email': '1000000@gmail.com',
      'phone': '1000000'
    }
  }
  return contactGet
})

Mock.mock('/web/club/contact/', 'put', () => {
  const contactPut = {
    'status': 200,
    'data': {
    }
  }
  return contactPut
})

Mock.mock('/web/club/record/', 'get', () => {
  const record = {
    'status': 200,
    'data': {
      'records': [
        {
          'name': 'Yulu Chao',
          'content': 'Change activity info',
          'time': '2019-6-18 14:01'
        },
        {
          'name': 'Lucy',
          'content': 'Change department info',
          'time': '2019-6-18 14:02'
        },
        {
          'name': 'Ada',
          'content': 'Change contact info',
          'time': '2019-6-18 14:03'
        },
        {
          'name': 'Su',
          'content': 'Change basic info',
          'time': '2019-6-18 14:04'
        },
        {
          'name': 'Yulu Chao',
          'content': 'Change activity info',
          'time': '2019-6-18 14:01'
        },
        {
          'name': 'Lucy',
          'content': 'Change department info',
          'time': '2019-6-18 14:02'
        },
        {
          'name': 'Ada',
          'content': 'Change contact info',
          'time': '2019-6-18 14:03'
        },
        {
          'name': 'Su',
          'content': 'Change basic info',
          'time': '2019-6-18 14:04'
        },
        {
          'name': 'Yulu Chao',
          'content': 'Change activity info',
          'time': '2019-6-18 14:01'
        },
        {
          'name': 'Lucy',
          'content': 'Change department info',
          'time': '2019-6-18 14:02'
        },
        {
          'name': 'Ada',
          'content': 'Change contact info',
          'time': '2019-6-18 14:03'
        },
        {
          'name': 'Su',
          'content': 'Change basic info',
          'time': '2019-6-18 14:04'
        },
        {
          'name': 'Yulu Chao',
          'content': 'Change activity info',
          'time': '2019-6-18 14:01'
        },
        {
          'name': 'Lucy',
          'content': 'Change department info',
          'time': '2019-6-18 14:02'
        },
        {
          'name': 'Ada',
          'content': 'Change contact info',
          'time': '2019-6-18 14:03'
        },
        {
          'name': 'Su',
          'content': 'Change basic info',
          'time': '2019-6-18 14:04'
        },
        {
          'name': 'Yulu Chao',
          'content': 'Change activity info',
          'time': '2019-6-18 14:01'
        },
        {
          'name': 'Lucy',
          'content': 'Change department info',
          'time': '2019-6-18 14:02'
        },
        {
          'name': 'Ada',
          'content': 'Change contact info',
          'time': '2019-6-18 14:03'
        },
        {
          'name': 'Su',
          'content': 'Change basic info',
          'time': '2019-6-18 14:04'
        }
      ]
    }
  }
  return record
})

export default Mock
