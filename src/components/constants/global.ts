// blood group name 
export const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export const bloodGroupOption = bloodGroup.map((item) => ({
    value: item,
    label: item,
}))
// gender name
export const gender = ["male", "female", "others"]
export const genderOption = gender.map((item) => ({
    value: item,
    label: item,
}))