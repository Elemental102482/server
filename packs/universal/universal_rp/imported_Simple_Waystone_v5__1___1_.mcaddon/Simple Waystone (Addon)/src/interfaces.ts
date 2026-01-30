import { Vector3 } from "@minecraft/server"

export interface config {
  organize: boolean,
  organizeDimension: number,
  showDimension: number,
  organizePublic: number,
  showPublic: boolean
}

export interface configForm extends Array<boolean | number> {
  0: boolean,
  1: number,
  2: number,
  3: number,
  4: boolean
}

export interface pistonDirection {
  0: "x" | "y" | "z",
  1: number
}

export type typeAccess = "public" | "private"

export interface waystoneEdit {
  value: waystoneInfo,
  index: number
}

export interface waystoneForm extends Array<string | boolean> {
  0: string
  1: boolean
}

export interface waystoneInfo {
  id: string,
  pos: Vector3,
  world: string,
  owner: string,
  type: typeAccess
}

export interface waystoneInfoArray {
  0: string,
  1: [number, number, number],
  2: string,
  3: string,
  4: typeAccess
}

export interface waystonePrivate {
  [key: string]: waystoneInfo[]
}