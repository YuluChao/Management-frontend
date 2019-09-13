# Management-frontend

> A Vue SPA

## Demo
[Demo](https://yuluchao.github.io/Management-frontend/)
- using mockjs as mock server

## Requirements
- nodejs v6.0
- npm

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

```bash
# to run the mock server
stubby -d ./api_service/api.json -w
```

## API
### Club Management API

| Code | message                  |
| ---- | ------------------------ |
| 200  | Success                  |
| 203  | Entity Doe not Exist     |
| 205  | Show Custom Message      |
| 300  | Login Required           |
| 400  | Lack of parameter \| Parameter Error \| Json Format Error |
| 401  | Network Error            |
| 402  | Permission Deny          |
| 500  | Server Error             |

##### Login

```json
path: /web/club/login/
method: post
params: 
{
    key: ""
}
return 
{
    status: 200,
    message: "SUCCESS",
    data: {
        clubInfo: {
            name: "Link",
            summary: "Good",           
            introduction: "Join us!",
            locale: ["UPC"],
            type: "Technology",
            image: "http://www.google.com",
            logo: "http://www.google.com",
            tag: "Hot",            
            email: "00000@gmail.com",
            apply_url: "www.google.com",
            show_type: "app|native",
            url: "www.google.com"
        }
    }
}
```

##### Logout

```json
path: /web/club/logout/
```


---


##### Get Club Information

```json
path: /web/club/basic/
method: get
return
{
    status: 200,
    message: "SUCCESS",
    data: {
      clubInfo: {
            name: "Link",
            summary: "Good",           
            introduction: "Join us",
            locale: ["UPC"],
            type: "Technology",
            image: "http://www.google.com",
            logo: "http://www.google.com",
            tag: "Hot",            
            email: "00000@gmail.com",
            apply_url: "www.google.com",
            show_type: "app|native",
            url: "www.google.com"
        }
    }
}
```

---

#####  Modify Club Information

```json
path: /web/club/basic/
method: put
Fields:
{
    name: "Link",
    summary: "Good",           
    introduction: "Join us",
    locale: ["UPC"],
    type: "Technology",
    image: "http://www.google.com",
    logo: "http://www.google.com",
    tag: "Hot",            
    email: "00000@gmail.com",
    apply_url: "www.google.com",
    show_type: "app|native",
    url: "www.google.com"
}
```

---

##### Get Contact
```json
path: /web/club/contact/
method: get
return
{
    status: 200,
    message: "SUCCESS",
    data: {
        phone: "10000000000",
        email: "10000@gmail.com"
    }
}
```

##### Modify Contact

```json
path: /web/club/contact/
method: put
params:
{
    phone: "",
    email: ""
}
return 
{
    status: 200,
    message: "SUCCESS",
    data:{
    }
}
```

---

##### Get Department Information

```json
path: /web/club/dept/
method: get
return
{
    status: 200,
    message: "SUCCESS",
    data: {
        depts: [
            {
                dept_id: "1",
                name: "iOS",
                image: "http://www.google.com",
                introduction: "Join us!"
            },
            {
                dept_id: "2",
                name: "Web",
                image: "http://www.google.com",
                introduction: "Join us!"
            }
        ]
    }
}
```

##### Add Department

```json
path: /web/club/dept/
method: post
(form-data)
```

##### Delete Department

```json
path: /web/club/dept/
method: delete
params:
{
    dept_id: ""
}
return 
{
    status: 200,
    message: "SUCCESS",
    data:{     
    }
}
```

##### Modify Department

```json
path: /web/club/dept/
method: put
params:
{
    dept_id: "1",
    form-data
}

return
{
    status: 200,
    message: "SUCCESS",
    data: {
    }
}
```

##### Modify Department Order

```json
path: /web/club/dept/order/
method: put
params:
{
    dept_id: "1",
    dept_index: 1
}

return
{
    status: 200,
    message: "SUCCESS",
    data: {
    }
}
```

---

##### Get Activity Information

```json
path: /web/club/activity/
method: get
return
{
    statue: 200,
    message: "SUCCESS",
    data: {
        activities: [
             {
                activity_id: "1",
                name: "Movie Day",
                image: "http://www.google.com",
                tag: "Hot",
                introduction: "Join us!"
            },
            {
                activity_id: "2",
                name: "Taco Day",
                image: "http://www.google.com",
                tag: "Hot",
                introduction: "Join us!"
            }
        ]
    }
}
```

##### Add Activity

```json
path: /web/club/activity/
method: post
(form-data)
```

##### Delete Activity

```json
path: /web/club/activity/
method: delete
params: 
{
    activity_id: ""
}
return
{
    status: 200,
    message: "SUCCESS",
    data: {
        
    }
}
```

##### Modify Activity

```json
path: /web/club/activity/
method: put
params:
{
    activity_id: "2",
    form-data
}

return
{
    status: 200,
    message: "SUCCESS",
    data: {
    }
}
```

##### Modify Activity Order

```json
path: /web/club/activity/order/
method: put
params:
{
    activity_id: "2",
    activity_index: 1
}

return
{
    status: 200,
    message: "SUCCESS",
    data: {
    }
}
```

---

##### Get History Records

```json
path: /web/club/record/
method: post
params: 
{
    since_id: 0,
    count: 15
}
return
{
    status: 200,
    message: "SUCCESS",
    data: {
        records: [
             {
                name: "Yulu Chao",
                content: "Modify basic information|Modify department information|Modify activity information|Modify contact information",
                time: "2019-07-13 12:24:56"
             },
             {
                name: "",
                content: "",
                time: "2019-07-13 13:12:24"
             }  
        ]
    }
}
```