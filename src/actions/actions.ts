'use server';

import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(petData) {
    await sleep(2000);
    try {
        await prisma.pet.create({
            data: petData,
        });
    } catch (err) {
        return {
            message: "Failed to add pet",
        }
    }

    revalidatePath('/app', 'layout')
}


export async function editPet(petId: string, newPetData) {
    await sleep(2000);
    try {
        await prisma.pet.update({
            where: {
                id: petId
            },
            data: newPetData,
        });
    } catch (err) {
        return {
            message: "Failed to edit pet",
        }
    }

    revalidatePath('/app', 'layout')
}

export async function deletePet(petId: string) {
    await sleep(2000);
    try {
        await prisma.pet.delete({
            where: {
                id: petId,
            },
        });
    } catch (err) {
        return {
            message: "Failed to delete pet",
        }
    }

    revalidatePath('/app', 'layout')
}