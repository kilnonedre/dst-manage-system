const joinPath = (url: string, route?: string | number) => {
  const path = `/${route}` ?? ''
  return `${url}${path}`
}

const Get = (url: string, params?: object, config?: object) => {
  let suffix = ''
  if (params) {
    const values = Object.values(params)
    Object.keys(params).forEach((key, index) => {
      suffix = `${suffix}&${key}=${values[index]}`
    })
    suffix = `?${suffix.slice(1)}`
  }
  return fetch(`${url}${suffix}`, { method: 'GET', ...config })
}

const Post = (url: string, params?: object, config?: object) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    ...config,
  })
}

const Put = (url: string, params?: object, config?: object) => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(params),
    ...config,
  })
}

const Delete = (url: string, params?: object, config?: object) => {
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(params),
    ...config,
  })
}

export { joinPath, Get, Post, Put, Delete }
