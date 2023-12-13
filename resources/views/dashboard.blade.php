<x-app-layout>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="{{ asset('js/app.js') }}" defer></script>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
        
    </x-slot>

    <!-- Parte interna do dashboard -->
    <div class="py-12">
        <div id="hello-react"></div>
    </div>
</x-app-layout>
