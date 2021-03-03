
// 비어있는지를 판별
export function isEmptyObject(param:{}) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

// int형으로 변환 리턴
export function toInt(data:any, defaultValue:any) {
  if ( data == null ) {
    return defaultValue;
  }

  return parseInt(data)
}

// defaultValue값에 undefined(null과 비슷한 개념) 담고 toInt()로 넘김
export function toIntOrUnd(data:any) {
  return toInt(data, undefined);
} 

// defaultValue값에 null 담고 toInt()로 넘김
export function toIntOrNull(data:any) {
  return toInt(data, null);
} 