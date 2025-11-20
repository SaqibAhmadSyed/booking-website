const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.resource.createMany({
    data: [
      {
        name: "Study Room A101",
        description: "Quiet study room with whiteboard and AC power outlets.",
        type: "room",
        location: "Building A - Floor 1",
        capacity: 4,
        image_url: "https://example.com/images/study_a101.jpg",
        is_available: true
      },
      {
        name: "Study Room A102",
        description: "Collaborative study room with large TV display.",
        type: "room",
        location: "Building A - Floor 1",
        capacity: 6,
        image_url: "https://example.com/images/study_a102.jpg",
        is_available: true
      },
      {
        name: "Conference Room B210",
        description: "Medium-sized conference room with seating for 12.",
        type: "conference",
        location: "Building B - Floor 2",
        capacity: 12,
        image_url: "https://example.com/images/conf_b210.jpg",
        is_available: true
      },
      {
        name: "Computer Lab C301",
        description: "Computer lab equipped with 30 high-performance PCs.",
        type: "lab",
        location: "Building C - Floor 3",
        capacity: 30,
        image_url: "https://example.com/images/lab_c301.jpg",
        is_available: true
      },
      {
        name: "Projector D12",
        description: "Portable 1080p projector with HDMI input.",
        type: "equipment",
        location: "Storage Room D",
        capacity: 1,
        image_url: "https://example.com/images/projector_d12.jpg",
        is_available: true
      },
      {
        name: "3D Printer Lab E120",
        description: "Room with 4 industrial 3D printers.",
        type: "lab",
        location: "Building E - Floor 1",
        capacity: 8,
        image_url: "https://example.com/images/3d_e120.jpg",
        is_available: false
      },
      {
        name: "Auditorium F500",
        description: "Large auditorium with stage, audio system, and 100 seats.",
        type: "auditorium",
        location: "Building F - Floor 5",
        capacity: 100,
        image_url: "https://example.com/images/aud_f500.jpg",
        is_available: true
      },
      {
        name: "Music Practice Room G12",
        description: "Soundproof room with piano.",
        type: "practice_room",
        location: "Building G - Basement",
        capacity: 2,
        image_url: "https://example.com/images/music_g12.jpg",
        is_available: true
      },
      {
        name: "Photography Studio H220",
        description: "Studio with lighting, backdrop, and camera mounts.",
        type: "studio",
        location: "Building H - Floor 2",
        capacity: 10,
        image_url: "https://example.com/images/photo_h220.jpg",
        is_available: true
      },
      {
        name: "Gymnasium Court 1",
        description: "Indoor sports court available for general bookings.",
        type: "gym",
        location: "Sports Complex",
        capacity: 50,
        image_url: "https://example.com/images/gym_court1.jpg",
        is_available: true
      }
    ],
    skipDuplicates: true
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
