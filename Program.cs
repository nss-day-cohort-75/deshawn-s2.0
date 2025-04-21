using Deshawns.Models;
using Deshawns.Models.DTOs;

List<Dog> dogs = new List<Dog> {
    new Dog { Id = 1, Name = "Deedubya", WalkerId = 2 },
    new Dog { Id = 2, Name = "Bark Twain", WalkerId = 1 },
    new Dog { Id = 3, Name = "Sir Waggington", WalkerId = 3 },
    new Dog { Id = 4, Name = "Pupperoni", WalkerId = 1 },
    new Dog { Id = 5, Name = "Fluff McSnuffles", WalkerId = 2 },
    new Dog { Id = 6, Name = "Clifford", WalkerId = null }
};

List<Walker> walkers = new List<Walker> {
    new Walker { Id = 1, WalkerName = "Chowda" },
    new Walker { Id = 2, WalkerName = "Scoots" },
    new Walker { Id = 3, WalkerName = "Luna Belle" }
};

List<City> cities = new List<City> {
    new City { Id = 1, CityName = "Dog Town" },
    new City { Id = 2, CityName = "Pawville" },
    new City { Id = 3, CityName = "Barkside" }
};

List<CityWalker> cityWalkers = new List<CityWalker> {
    new CityWalker { Id = 1, CityId = 1, WalkerId = 1 },
    new CityWalker { Id = 2, CityId = 1, WalkerId = 2 },
    new CityWalker { Id = 3, CityId = 2, WalkerId = 3 },
    new CityWalker { Id = 4, CityId = 3, WalkerId = 1 },
    new CityWalker { Id = 5, CityId = 2, WalkerId = 2 }
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

// Dogs
app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId
    });
});

app.MapGet("/api/dogs/{id}", (int id) => $"Fetch dog with id {id}");
app.MapPost("/api/dogs", () => "Add a new dog");
app.MapDelete("/api/dogs/{id}", (int id) => $"Delete dog with id {id}");

// Walkers
app.MapGet("/api/walkers", () => "Fetch all walkers");
app.MapGet("/api/walkers/{id}", (int id) => $"Fetch walker with id {id}");
app.MapPut("/api/walkers/{id}/cities", (int id) => $"Update cities for walker {id}");
app.MapDelete("/api/walkers/{id}", (int id) => $"Delete walker with id {id}");

// Cities
app.MapGet("/api/cities", () => "Fetch all cities");
app.MapPost("/api/cities", () => "Add a new city");
app.MapDelete("/api/cities/{id}", (int id) => $"Delete city with id {id}");

// Assign Dog to Walker
app.MapPost("/api/walkers/{walkerId}/assign-dog/{dogId}", (int walkerId, int dogId) =>
    $"Assign dog {dogId} to walker {walkerId}");

// Filter Walkers by City
app.MapGet("/api/walkers-by-city", (int cityId) => $"Fetch walkers in city {cityId}");

app.Run();
