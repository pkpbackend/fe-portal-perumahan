interface TProfile {
  id: number
  nama: string
  username: string
  email: string
  ProvinsiId: number
  RoleId: number
  cityId: number
  DirektoratId: number
  pengembangId: number
  // region: "{\"provinsi\":[],\"kabupaten\":[]}",
  region: any
  active: boolean
  instansi: string
  alamatInstansi: string
  createdAt: string
  updatedAt: string
  Role: {
    id: number
    nama: string
    privilege: any
    pengembang: string
    DirektoratId: number
    ScopeRegionRoleId: number
    direktif: number
    pengusul: string
    scopeCrud: any
    admin: boolean
    dashboard: number
    defaultLogin: number
    createdAt: string
    updatedAt: string
    accessMenu: Array<string>
  }
  isPengembang?: boolean
}
  
interface TAccountProfile {
  user: TProfile
  iat: number
  exp: number
}